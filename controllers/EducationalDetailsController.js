

const EducationalDetails = require('../models/EducationalDetailsModel');
const User = require('../models/UserModel');

exports.addEducationDetails = async (req, res) => {
  try {
    console.log("Request body:", req.body);

  
    const { education,user_id } = req.body;

    console.log("Education data:", education);

    if (!Array.isArray(education)) {
      return res.status(400).json({
        success: false,
        message: "Education must be an array.",
      });
    }

    // Array to hold validation messages
    const validationErrors = [];

    // Iterate through each education entry and validate
    education.forEach((edu, index) => {
      if (!edu.program) validationErrors.push(`Program in entry ${index + 1}`);
      if (!edu.school_college_name) validationErrors.push(`School/College Name in entry ${index + 1}`);
      if (!edu.board_university) validationErrors.push(`Board/University in entry ${index + 1}`);
      if (!edu.score) validationErrors.push(`Score in entry ${index + 1}`);
      // if (!edu.score_type) validationErrors.push(`Score Type in entry ${index + 1}`);
      if (!edu.start_date) validationErrors.push(`Start Date in entry ${index + 1}`);
      if (!edu.end_date) validationErrors.push(`End Date in entry ${index + 1}`);
    });

    // Check if there are any validation errors
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: `${validationErrors.join(", ")} is required.`,
      });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const exist = await EducationalDetails.findOne({ user_id: user_id });
    let data;
    if (exist) {
      data = await EducationalDetails.findOneAndUpdate(
        { user_id: user_id },
        { education: education },
        { new: true } // This option returns the updated document
      );
    } else {
      data = await EducationalDetails.create({
        user_id: user_id,
        education: education,
      });
    }

    await User.findByIdAndUpdate(user_id, {
      educational_details: data._id,
    });

    const all_data = await User.findById(user_id).populate("educational_details");

    return res.status(200).json({
      success: true,
      message: "Education details added successfully",
      data: all_data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllEducationDetails = async (req, res) => {
  const { search } = req.query;
  let query = {};

  if (search) {
    query = {
      $or: [
        { "user_id.first_name": { $regex: search, $options: 'i' } },
        { "user_id.last_name": { $regex: search, $options: 'i' } },
        { "user_id.mobile": { $regex: search, $options: 'i' } },
        { "user_id.email": { $regex: search, $options: 'i' } },
      ]
    };
  }

  try {
    const educationDetails = await EducationalDetails.find(query).populate('user_id');

    if (!educationDetails.length) {
      return res.status(404).json({
        success: false,
        message: 'No education details found',
      });
    }

    return res.status(200).json({
      success: true,
      message: "Education details fetched successfully",
      educationDetails
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getEducationDetailsById = async (req, res)=>{
 const {id} = req.params;

 try{
  const educationDetails = await EducationalDetails.findById(id).populate('user_id');

  if(!educationDetails){
    return res.status(400).json({
      success: false,
      message : "Eduactional details not found"
    })
  }

  return res.status(200).json({
    success: true,
    message: "Eduactional details fetched successfully",
    educationDetails
  })

 }
 catch(error){
  return res.status(500).json({
    success: false,
    message: error.message
  })
 }
}