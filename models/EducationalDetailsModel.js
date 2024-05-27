const mongoose = require('mongoose');

const educationalDetailsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  education: [{
  program: {
    type: String,
    // required: true,
  },
  school_college_name: {
    type: String,
    // required: true,
  },
  board_university: {
    type: String,
    // required: true,
  },
  score: {
    type: String,
    // required: true,
  },
  score_type:{
    type:String
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  branch_specialization: {
    type: String,
  }
}
]

});

module.exports = mongoose.model('EducationalDetails', educationalDetailsSchema);
