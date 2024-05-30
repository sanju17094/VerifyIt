const mongoose = require("mongoose");

const SequenceSchema = new mongoose.Schema({
  sequence: {
    type: [String], 
    default: [
      "Personal Details",
      "Educational Details",
      "Professional Details",
      "Documents Details",
    ],
  },
});

module.exports = mongoose.model("Sequence", SequenceSchema);
