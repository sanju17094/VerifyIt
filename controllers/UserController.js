const User = require("../models/UserModel");
const signupVerifyOTP = require("../models/SignUpVerifyModel");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res,next) => {
  try {
    const {
      first_name,
      last_name,
      role,
      mobile,
      email,
      password,
      confirm_password,
    } = req.body;

    // Collecting validation errors
    let validationErrors = [];

    if (!first_name) {
      validationErrors.push("first name");
    } else if (!/^[a-zA-Z ]+$/.test(first_name)) {
      validationErrors.push("first name should contain only characters");
    }

    if (!last_name) {
      validationErrors.push("last name");
    } else if (!/^[a-zA-Z ]+$/.test(last_name)) {
      validationErrors.push("last name should contain only characters");
    }

    if (!mobile) {
      validationErrors.push("mobile number");
    } else if (mobile.toString().length !== 10) {
      validationErrors.push("mobile number must be 10 digits");
    }

    if (!email) {
      validationErrors.push("email");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "invalid email format",
      });
    }

    if (password.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter the password",
      });
    }

    if (confirm_password.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter confirm password",
      });
    }

    if (password !== confirm_password) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password not matched!",
      });
    }

    // Check for any validation errors
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Please fill the ${validationErrors.join(", ")}.`,
      });
    }

    // Check if user already exists by mobile or email
    const existingUser = await User.findOne({
      $or: [{ mobile: mobile }, { email: email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "The User with this mobile number or email already exists. Try to login",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const localCheck = await signupVerifyOTP.findOne({
      mobile: mobile,
      email: email,
    });

    if (localCheck) {
      await signupVerifyOTP.findOneAndUpdate(
        { mobile: mobile, email: email },
        {
          mobile: mobile,
          email: email,
          otp: otp,
          first_name: first_name,
          last_name: last_name,
          password: password,
          role: role,
        }
      );
    } else {
      await signupVerifyOTP.create({
        mobile: mobile,
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: password,
        role: role,
        otp: otp,
      });
    }

    const payload = {
      mobile: mobile,
      email: email,
    };
    const token = jwt.sign(payload, process.env.JWT_AUTH, { expiresIn: "5m" });
    req.body.mail = {
     senderEmail:"sanjay2795744@gmail.com",
     senderName:" Sanjay Choudhary",
     recipientEmail:email,
     subject:"OTP Verfication",
     text:`Your Verification OTP is -> ${otp}`,
     token:token
    }
next();
    // return res.status(200).json({
    //   success: true,
    //   message: "Please verify your mobile number and email",
    //   token,
    // });
  } catch (err) {
    if (err.code === 11000) {
      const duplicateKey = Object.keys(err.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `The User with this ${duplicateKey} already exists. Try to login`,
      });
    }
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in storing data of signup!",
      error: err.message,
    });
  }
};

exports.signupVerifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log("Token->>",token)
    const decoded = jwt.verify(token, process.env.JWT_AUTH);
    const mobile = decoded.mobile;
    const email = decoded.email;
    const check = await signupVerifyOTP.findOne({
      mobile: mobile,
      email: email,
    });
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "please enter otp",
      });
    }

    if (!check) {
      return res.status(400).json({
        success: false,
        message: "The User is Not registered",
      });
    }
    if (check.otp != otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    // // Hash password
    let hashedPassword = "";

    hashedPassword = await bcrypt.hash(check.password, 10);

    // Create user in the database

    const newUser = await User.create({
      first_name: check.first_name,
      last_name: check.last_name,
      mobile: check.mobile,
      email: check.email,
      password: hashedPassword,
    });

    await signupVerifyOTP.findByIdAndDelete(check._id);
    return res.status(200).json({
      success: true,
      message: "Registration Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.loginWithPassword = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    if ((!email && !mobile) || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }
    let user;
    if (mobile) {
      user = await User.findOne({ mobile });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    const payload = {
      userID: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      mobile: user.mobile,
    };

    const token = jwt.sign(payload, process.env.JWT_AUTH, {
      expiresIn: "5d",
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

exports.loginUserWithMobile = async (req, res) => {
  try {
    // console.log("req me arha h");
    const { mobile } = req.body;
    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Please Enter Mobile Number ",
      });
    }
    if (mobile.toString().length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Please Enter Mobile Number in 10 digits",
      });
    }
    // console.log("OTP TAK ARHA");
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const checkUser = await User.findOne({ mobile });

    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "This user is not found in database",
      });
    }

    const data = await User.findOneAndUpdate(
      { mobile },
      {
        last_login: Date.now(),
        otp: 123456,
      },
      { new: true }
    );

    const payload = {
      mobile: mobile,
    };
    const token = jwt.sign(payload, process.env.JWT_AUTH, { expiresIn: "5m" });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      token,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Error in login",
      error: err.message,
    });
  }
};

exports.loginCheckOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const tokenOTP = req.header("Authorization").replace("Bearer ", "");

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "Please Enter OTP",
      });
    }
    if (!tokenOTP) {
      return res.status(400).json({
        success: false,
        message: "Please Send Token",
      });
    }
    const decoded = await jwt.verify(tokenOTP, process.env.JWT_AUTH);

    const mobile = decoded.mobile;

    if (mobile.toString().length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Please Enter Mobile Number in 10 digits",
      });
    }
    const checkUser = await User.findOne({ mobile });

    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "This account is not found",
      });
    }

    if (checkUser && checkUser.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Otp not matched",
      });
    }
    let check;
    if (checkUser) {
      check = checkUser;
      await User.findByIdAndUpdate(check._id, {
        otp: "",
      });
    }

    const payload = {
      userID: check._id,
      first_name: check.first_name,
      last_name: check.last_name,
    };
    const token = jwt.sign(payload, process.env.JWT_AUTH, { expiresIn: "5d" });

    return res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      token,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Error in login-otp",
      error: err.message,
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { first_name: { $regex: search, $options: "i" } },
          { last_name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { mobile: { $regex: search, $options: "i" } },
        ],
      };
    }

    const users = await User.find(query)
      .populate("personal_details")
      .populate("educational_details")
      .populate("professional_details")
      .populate("documents_details").sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("first_name last_name mobile email verified createdAt")
      .sort({ createdAt: -1 }); // Sort by createdAt in descending order

    if (!users.length) {
      return res.status(400).json({
        success: false,
        message: "No users found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getUserDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate("personal_details")
      .populate("educational_details")
      .populate("professional_details")
      .populate("documents_details");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove fields with null or empty string values
    const cleanUser = JSON.parse(JSON.stringify(user), (key, value) => {
      if (value === null || value === "") {
        return undefined; // Remove the key if the value is null or an empty string
      }
      return value;
    });

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: cleanUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.SubmitDoc = async (req,res)=>{
  try {
    const { id } = req.params;
    if(!id){
      return res.status(400).json({
        success: false,
        message: "Invalid user id"
        })
    }
    const update = await User.findByIdAndUpdate(id,{
      submitted:true
    },{new:true});
    return res.status(200).json({
      success: true,
      message: "Document submitted successfully",
    })
  }catch(err){
return res.status(500).json({
  success: false,
  message: err.message,
})
  }
}

exports.Verfication = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }
    const update = await User.findByIdAndUpdate(
      id,
      {
        verified: true,
        admin_message:""
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Document Verified successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getSubmitAndVerification = async(req,res)=>{
  try{
const {id} = req.params;
const statusUpdate = await User.findById(id).select("submitted verified admin_message");
console.log("the submited and verification data",statusUpdate);
return res.status(200).json({
  success:true,
  message:"Verification and Submit status",
  data:statusUpdate
})

  }catch(err){
return res.status(500).json({
  success:false,
  message:err.message
})
  }
}

exports.adminMessage = async(req,res)=>{
  try{
const {id}=req.params;
const {message}=req.body;
const adminMessage = await User.findByIdAndUpdate(id,{admin_message:message},{new:true});
return res.status(200).json({
  success:true,
  message:"Message sent successfully to User",
  message:adminMessage.admin_message
})

  }catch(err){
return res.status(500).json({
  success:false,
  message:err.message
})
  }
}

exports.getUserCount = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const trueStatusCount = await User.countDocuments({ verified: true });
    const falseStatusCount = await User.countDocuments({ verified: false });

    return res.status(200).json({
      success: true,
      message: "User counts retrieved successfully",
      data: {
        totalUsers,
        trueStatusCount,
        falseStatusCount,
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
