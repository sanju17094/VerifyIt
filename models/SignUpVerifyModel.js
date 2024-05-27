const mongoose = require("mongoose");

const signupVerifyOTP = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
   otp:{
    type:String
   }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("signupVerifyOTP", signupVerifyOTP);
