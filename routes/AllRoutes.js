const express = require("express");
const router = express.Router();
//mail
const mail = require("../controllers/NodeMailerController");
// router.post("/mail/send", mail.mail);
// User Routes
const user = require("../controllers/UserController");
router.post("/signup", user.signup,mail.mail);
router.post("/signup/verify-otp", user.signupVerifyOTP);
router.post("/login/password", user.loginWithPassword);
router.post("/login/otp/mobile", user.loginUserWithMobile);
router.post("/login/otp/verify", user.loginCheckOTP);
router.get("/user/get", user.getAllUserDetails);
router.get("/users/get-id/:id", user.getUserDetailsById);
router.get("/usersList/get", user.getUsers);
router.get("/submit/all/:id", user.SubmitDoc);
router.get("/verify/user/:id", user.Verfication);
router.get("/fetch/submit-verification/:id", user.getSubmitAndVerification);
router.post("/send/message-to-user/:id", user.adminMessage);

// Personal Details Routes
const personal = require("../controllers/PersonalDetailsController");
router.post("/personal-details/create", personal.createPersonalDetails);
router.get("/personal-details/get", personal.getAllPersonalDetails);
router.get("/personal-details/get-id/:id", personal.getPersonalDetailsById);

// Educational Routes
const education = require("../controllers/EducationalDetailsController");
router.post("/education/add", education.addEducationDetails);
router.get("/education-details/get", education.getAllEducationDetails);
router.get("/education-details/get-id/:id", education.getEducationDetailsById);

// Professional Routes
const professional = require("../controllers/ProfessionalDetailsController");
router.post(
  "/professional-details/create",
  professional.addProfessionalDetails
);
router.get("/professional-details/get", professional.getAllProfessionalDetails);
router.get(
  "/professional-details/get-id/:id",
  professional.getProfessionalDetailsById
);

// Documentation Routes
// const documentation = require("../controllers/DocumentsController");
const imageUpload = require("../middlewares/multer");
const {
  UploadDocuments,
  uploadFile,
  getAllDocument,
  getDocumentById,
} = require("../controllers/DocumentsController");
router.post("/documentation/create", UploadDocuments);
router.get("/documentation/get", getAllDocument);
router.get("/documentation/get-id/:id", getDocumentById);
router.post(
  "/upload-file",
  imageUpload.fields([
    {
      name: "uploadFile",
      maxCount: 10,
    },
  ]),
  uploadFile
);

//sequecing
const {
  updateSquence,
  fetchSequence,
} = require("../controllers/SequencingController");
router.post("/sequencing/update", updateSquence);
router.get("/sequencing/fetch", fetchSequence);

//user Sequence
const {
  UserSquence,
  setSequenceUser,
} = require("../controllers/SequencingController");
router.get("/user-sequence/fetch/:id", UserSquence);
router.post("/user-sequence/set/:id", setSequenceUser);

//Contact Us Routes

const contactUs = require("../controllers/ContactUsController");
router.post("/contact-us/create", contactUs.createContactUs);
router.get("/contact-us/get", contactUs.getContactUsEntries);

//documnet uplooad required doc
const {
  updateUserDocuments,
  DocUpload,
} = require("../controllers/SequencingController");
router.post('/required/doc/:id',updateUserDocuments);
router.get("/required/doc/fetch/:id", DocUpload);


module.exports = router;
