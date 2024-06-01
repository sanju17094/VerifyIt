const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    last_login:{
      type: Date,
    },
    otp:{
      type:String,
      default:""
    },
    sequence:{
      type:[String],
      default:null
    },
    personal_details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PersonalDetails",
    },
    educational_details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EducationalDetails",
    },
    professional_details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProfessionalDetails",
    },
    documents_details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Documents",
    },
    submitted:{
      type:Boolean,
      default:false
    },
    verified:{
      type:Boolean,
      default:false
    },
    admin_message:{
      type:String,
      default:"" 
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
