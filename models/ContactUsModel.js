const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});

const ContactUs = mongoose.model("ContactUs", contactUsSchema);

module.exports = ContactUs;
