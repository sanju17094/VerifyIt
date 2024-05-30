const User = require("../models/UserModel");
const ProfessionalDetails = require("../models/ProfessionaldetailsModel");

exports.addProfessionalDetails = async (req, res) => {
  
  const { user_id, details } = req.body;

  // const user_id = "664cd36d563acb8deb2a9a16"; // Hardcoded user ID

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const validationErrors = [];

    if (!Array.isArray(details)) {
      return res.status(400).json({
        success: false,
        message: "Details must be an array.",
      });
    }

    details.forEach((detail, index) => {
      if (!detail.company_name) validationErrors.push(`Company Name in entry ${index + 1}`);
      if (!detail.job_title) validationErrors.push(`Job Title in entry ${index + 1}`);
      if (!detail.location) validationErrors.push(`Location in entry ${index + 1}`);
      if (!detail.position_type) validationErrors.push(`Position Type in entry ${index + 1}`);
      if (!detail.company_sector) validationErrors.push(`Company Sector in entry ${index + 1}`);
      if (!detail.start_time) validationErrors.push(`Start Time in entry ${index + 1}`);
      if (!detail.end_time) validationErrors.push(`End Time in entry ${index + 1}`);
      if (!detail.salary) validationErrors.push(`Salary in entry ${index + 1}`);
    });

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: `${validationErrors.join(", ")} is required.`,
      });
    }

    let professionalDetails = await ProfessionalDetails.findOne({ user_id: user_id });

    if (professionalDetails) {
      professionalDetails.details = details;
      await professionalDetails.save();
    } else {
      professionalDetails = await ProfessionalDetails.create({
        user_id: user_id,
        details: details,
      });
    }

    user.professional_details = professionalDetails._id;
    await user.save();

    const populatedUser = await User.findById(user_id).populate("professional_details");

    return res.status(200).json({
      success: true,
      message: "Professional details added/updated successfully",
      data: populatedUser,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


exports.getAllProfessionalDetails = async (req, res) => {
  try {
    const professionalDetails = await ProfessionalDetails.find().populate('user_id');

    if (professionalDetails.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No professional details found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Professional details fetched successfully",
      data: professionalDetails
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


exports.getProfessionalDetailsById = async (req, res) => {
  const {id } = req.params;

  try{
    const professionaldetails = await ProfessionalDetails.findById(id).populate('user_id');

    if(!professionaldetails){
      return res.status(400).json({
        success : false,
        message : "No professional details found"
      })
    }

    return res.status(200).json({
      success : true,
      message : "Professional details fetched successfully",
      professionaldetails
    })
  }
  catch(error){
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}

