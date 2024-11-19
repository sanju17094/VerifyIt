const { updateMany } = require("../models/PersonlaDetailsModel");
const Squence = require("../models/SquencingModel");
const User = require("../models/UserModel");
exports.updateSquence = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }
    // console.log("above sequence");
    const { sequence } = req.body;
    // console.log("above sequence",sequence);
    if (!sequence) {
      return res.status(400).json({
        success: false,
        message: "Sequence is empty",
      });
    }
    const data = await Squence.find();
    // console.log("data of data",data)
    if (!data) {
      const newEntry = await Squence.create();
      return res.status(200).json({
        success: true,
        sequence: newEntry,
      });
    } else {
      const id = data[0]._id;
      console.log("id", id);
      const sequenceData = await Squence.findOneAndUpdate(
        { _id: id },
        { sequence: sequence },
        {
          new: true,
        }
      );
      return res.status(200).json({
        success: true,
        sequence: sequenceData,
      });
    }
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
    });
  }
};


exports.fetchSequence = async (req, res) => {
  try {
    const data = await Squence.find();
    if (data.length == 0) {
      const newEntry = await Squence.create({});
      return res.status(200).json({
        success: true,
        sequence: newEntry,
      });
    }

    return res.status(200).json({
      success: true,
      sequence: data[0],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.UserSquence = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "The id is not found",
      });
    }
    const data = await User.findById(id).select("sequence");
    // console.log("sequence", data);
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "The user is not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: data.sequence.length == 0 ? null : data.sequence,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.setSequenceUser = async (req, res) => {
  try {
    const { sequence } = req.body;
    const { id } = req.params;
    // console.log("Id ki value->>", id);
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "The id is not found",
      });
    }
    if (!sequence) {
      return res.status(400).json({
        success: false,
        message: "The sequence is not found",
      });
    }
    const setSequence = await User.findByIdAndUpdate(
      id,
      {
        sequence: sequence,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      data: setSequence,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateUserDocuments = async (req, res) => {
  const { id } = req.params;
  const { size, type, value } = req.body;
  console.log("Received request body:", req.body);
  console.log("Received request params:", req.params);

  const personal = ["adhar", "voter", "licence", "passport", "pan"];
  const education = ["high", "inter", "graduate", "post"];
  const professional = ["job1", "job2", "job3"];

  try {
    let update;
    if (type == "personal") {
       update = await User.findByIdAndUpdate(
        id,
        { $set: { [`documet_upload_array.${type}`]: ["profile", value] } },
        { new: true }
      );
    } else if(type=='education') {
       update = await User.findByIdAndUpdate(
        id,
        { $set: { [`documet_upload_array.${type}`]: education.slice(0,size) } },
        { new: true }
      );
    }else{
        update = await User.findByIdAndUpdate(
         id,
         {
           $set: { [`documet_upload_array.${type}`]: professional.slice(0, size) },
         },
         { new: true }
       );
    }

    if (!update) {
      console.log("User not found for id:", id);
      return res.status(404).json({ error: "User not found" });
    } else {
      console.log("User updated successfully:", update.documet_upload_array);
      res.status(200).json({
        success:true,
        message:`${type} Update successfully `,
        data:update.documet_upload_array
      });
    }
  } catch (error) {
    console.error("Error updating user documents:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.DocUpload = async(req,res)=>{
  try{
const {id} = req.params;
console.log("id ki value",id)
const findData = await User.findById(id).select("documet_upload_array");
if(!findData){
  return res.status(400).json({
    success:false,
    message:"data not found"
  })

}
   const { personal, education, professional } = findData.documet_upload_array;
   const combinedArray = [...personal, ...education, ...professional];
console.log("the combined array->>>", combinedArray);
return res.status(200).json({
  success: true,
  data: combinedArray,
});

  }catch(err){
return res.status(500).json({
  success:false,
  message:err.message
})
  }
}
