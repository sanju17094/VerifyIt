const mongoose = require("mongoose");

const professionalDetailSchema = new mongoose.Schema();

const professionalDetailsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    details: [
      {
        company_name: {
          type: String,
          required: true,
        },
        job_title: {
          type: String,
          required: true,
        },
        location: {
          type: String,
        },
        position_type: {
          type: String,
        },
        company_sector: {
          type: String,
        },
        start_time: {
          type: Date,
        },
        end_time: {
          type: Date,
        },
        salary: {
          type: Number,
        },
        more_details: {
          type: String,
        },
      },
    ], 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ProfessionalDetails",
  professionalDetailsSchema
);
