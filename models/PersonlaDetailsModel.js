const mongoose = require('mongoose');

const personalDetailsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    dob: {
      type: Date,
    },
    location: {
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },
    
   
    idProof: {
      type: String,
      // required: true,
    },
    idProofNumber: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('PersonalDetails', personalDetailsSchema);
