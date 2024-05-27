const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    pan: {
        src: String,
        fileName: String,
        orgname: String
    },
    adharCard: {
        src: String,
        fileName: String,
        orgname: String
    },
    voterId: {
        src: String,
        fileName: String,
        orgname: String
    },
    offerLetter: [{
        src: String,
        fileName: String,
        orgname: String
    }],
    profilePhoto: {
        src: String,
        fileName: String,
        orgname: String
    },
    x_marksheet: {
        src: String,
        fileName: String,
        orgname: String
    },
    xii_marksheet: {
        src: String,
        fileName: String,
        orgname: String
    },
    graduationMarksheet: {
        src: String,
        fileName: String,
        orgname: String
    },
    postGraduationMarksheet: {
        src: String,
        fileName: String,
        orgname: String
    },
    passport: {
        src: String,
        fileName: String,
        orgname: String
    },
    licence: {
        src: String,
        fileName: String,
        orgname: String
    }
});

module.exports = mongoose.model("Documents", documentSchema);
