const express = require('express');
const router = express.Router();
const Documents = require('../models/DocumentDetailsModel');
const User = require('../models/UserModel');

exports.UploadDocuments = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is empty"
      });
    }

    // Hardcoded user_id
    // const user_id = "664cd36d563acb8deb2a9a16";
    const {user_id}=req.body;

    // Check if documents already exist for the user
    const existingDocuments = await Documents.findOne({ user_id: user_id });

    let savedDoc;
    if (existingDocuments) {
      // Update existing documents
      savedDoc = await Documents.findOneAndUpdate(
        { user_id: user_id },
        { $set: req.body },
        { new: true } // Return the updated document
      );
    } else {
      // Create new documents
      const uploadDocData = { ...req.body, user_id: user_id };
      const uploadDoc = new Documents(uploadDocData);
      savedDoc = await uploadDoc.save();
    }

    // Update user's documents_details field with the document ID
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    user.documents_details = savedDoc._id;
    await user.save();

    // Populate user_id field with user data
    // savedDoc = await savedDoc.populate('user_id').execPopulate();
    const all_data = await User.findById(user_id).populate("documents_details");

    return res.status(200).json({
      success: true,
      message: "Document Uploaded Successfully",
      data: all_data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllDocument = async(req, res) =>{
  try{
      const documentDetails = await Documents.find().populate('user_id');
      // const documentDetails = await User.find(user_id).populate('documents_details');

      if(!documentDetails){
        return res.status(400).json({
          success : false,
          message : "No Document Found"
        })
      }

      return res.status(200).json({
        success : true,
        message : "Document fetched Successfully",
        data : documentDetails
      })
  }
  catch(error){
    return res.status(200).json({
      success : false,
      message : error.message
    })
  }
}

exports.getDocumentById = async (req, res) => {
  const {id} = req.params;
  try{
    const  docDetails = await Documents.findById(id).populate('user_id');
    if(!docDetails){
      return res.status(400).json({
        success : false,
        message : "Document details not found"
      })
    }

    return res.status(200).json({
      success : true,
      message : "Document details fetched successfully",
      docDetails
    })

  }
  catch(error){
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}


exports.uploadFile = async (req, res) => {
    try {
      let uploadFile;
      if (
        Array.isArray(req.files.uploadFile) &&
        req.files.uploadFile.length > 0
      ) {
        uploadFile = req.files.uploadFile.map((image) => {
          delete image.fieldname;
          delete image.encoding;
          delete image.destination;
          delete image.filename;
          delete image.size;
          const modifiedSrc = image.path.replace("\\", "/").replace("public/", "");
          return {
            src: modifiedSrc,
            fileName: image.mimetype,
            orgname: image.originalname,
          };
        });
      } else {
        return res.status(400).json({
          status: 0,
          message: "Upload at least one file.",
        });
      }
      console.log(uploadFile, "uploadedFileData");
  
      res.status(200).json({
        file_data: uploadFile,
        status: 1,
        message: "Files uploaded successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 0,
        message: "Internal server error",
      });
    }
  };
