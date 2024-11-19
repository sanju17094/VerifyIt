const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    

    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", AdminSchema);
