const ContactUs = require("../models/ContactUsModel");

// Validation functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateMobile = (mobile) => {
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
};

exports.createContactUs = async (req, res) => {
  try {
    const { full_name, email, mobile, subject, comments } = req.body;

    // Validate fields
    if (!full_name || !email || !mobile || !subject || !comments) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate mobile format
    if (!validateMobile(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must be 10 digits",
      });
    }

    const newContactUs = new ContactUs({
      full_name,
      email,
      mobile,
      subject,
      comments,
    });

    await newContactUs.save();

    return res.status(201).json({
      success: true,
      message: "Contact Us entry created successfully",
      data: newContactUs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getContactUsEntries = async (req, res) => {
  try {
    const contactUsEntries = await ContactUs.find();
    return res.status(200).json({
      success: true,
      message: "Contact Us entries retrieved successfully",
      data: contactUsEntries,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
