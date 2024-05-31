const PersonalDetails = require('../models/PersonlaDetailsModel');
const User = require('../models/UserModel');

exports.createPersonalDetails = async (req, res) => {
  const {user_id,
    gender,
    dob,
    location,
    idProof,
    idProofNumber,
  } = req.body;

  // Array to hold validation messages
  const validationErrors = [];

  // Validation checks for top-level fields
  if (!gender) validationErrors.push('Gender');
  if (!dob) validationErrors.push('Date of Birth');
  if (!location) {
    validationErrors.push('Location');
  } else {
    // Validation checks for location fields
    if (!location.address) validationErrors.push('Address');
    if (!location.city) validationErrors.push('City');
    if (!location.state) validationErrors.push('State');
    if (!location.country) validationErrors.push('Country');
    if (!location.zipcode) validationErrors.push('Zipcode');
  }
  if (!idProof) validationErrors.push('ID Proof');
  if (!idProofNumber) validationErrors.push('ID Proof Number');

  // Check if there are any validation errors
  if (validationErrors.length > 0) {
    return res.status(400).json({
      success: false,
      message: `${validationErrors.join(", ")} is required.`,
    });
  }


  try {
    const exist = await PersonalDetails.findOne({ user_id: user_id });
    let data;

    if (exist) {
      data = await PersonalDetails.findOneAndUpdate(
        { user_id: user_id },
        {
          gender,
          dob,
          location,
          idProof,
          idProofNumber,
        },
        { new: true } // This option returns the updated document
      );
    } else {
      data = await PersonalDetails.create({
        user_id,
        gender,
        dob,
        location,
        idProof,
        idProofNumber,
      });
    }

    console.log('Personal Details Data:', data);

    await User.findByIdAndUpdate(user_id, {
      personal_details: data._id,
    }, { new: true });

    const populatedData = await User.findById(user_id).populate("personal_details");
    console.log('Populated Data:', populatedData);

    return res.status(200).json({
      message: 'Personal details created successfully',
      success: true,
      data: populatedData
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

exports.getAllPersonalDetails = async (req, res) => {
  const { search } = req.query;
  let query = {};

  // Construct query based on search term
  if (search) {
    query = {
      $or: [
        { 'first_name': { $regex: search, $options: 'i' } }, // Search by first name
        { 'last_name': { $regex: search, $options: 'i' } }, // Search by last name
        { 'mobile': { $regex: search, $options: 'i' } }, // Search by mobile
        { 'email': { $regex: search, $options: 'i' } }, // Search by email
        { 'location.city': { $regex: search, $options: 'i' } }, // Search by city
        { 'location.state': { $regex: search, $options: 'i' } }, // Search by state
        { 'location.country': { $regex: search, $options: 'i' } } // Search by country
      ]
    };
  }

  try {
    const personalDetails = await PersonalDetails.find(query)
      .populate({
        path: 'user_id', // Correct the population path to user_id
        select: 'first_name last_name mobile email' // Selecting fields to populate
      });

    return res.status(200).json({
      message: 'Personal details fetched successfully',
      success: true,
      personalDetails
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    });
  }
};


exports.getPersonalDetailsById = async (req, res) => {
  const { id } = req.params;

  try {
    const personalDetails = await PersonalDetails.findOne({
      user_id: id,
    })

    if (!personalDetails) {
      return res.status(404).json({
        success: false,
        message: 'Personal details not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Personal details fetched successfully',
      personalDetails
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


