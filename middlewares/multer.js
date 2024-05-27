var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/'); // Upload destination folder
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        
        // Naming based on MIME type
        if (file.mimetype === 'application/pdf') {
            cb(null , Date.now() + '.pdf');
        } else if (file.mimetype === 'application/msword') {
            cb(null , Date.now() + '.doc');
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb(null , Date.now() + '.docx');
        } else if (file.mimetype === 'application/vnd.ms-excel') {
            cb(null , Date.now() + '.xls');
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            cb(null , Date.now() + '.xlsx');
        } else if (file.mimetype === 'text/csv') {
            cb(null , Date.now() + '.csv');
        } else if (file.mimetype === 'text/plain') {
            cb(null , Date.now() + '.txt');
        } else if (file.mimetype === 'image/jpeg') {
            cb(null, Date.now() + '.jpg');
        } else if (file.mimetype === 'image/png') {
            cb(null, Date.now() + '.png');
        } else if (file.mimetype === 'video/mp4') {
            cb(null, Date.now() + '.mp4');
        } else if (file.mimetype === 'video/x-msvideo') {
            cb(null, Date.now() + '.avi');
        } else if (file.mimetype === 'video/quicktime') {
            cb(null, Date.now() + '.mov');
        } else if (file.mimetype === 'application/vnd.ms-powerpoint') {
            cb(null , Date.now() + '.ppt');
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
            cb(null , Date.now() + '.pptx');
        } else {
            cb(null , Date.now() + '.' + extension); // Default case for other file types
        }
    }
});

var imageUpload = multer({ storage: storage });

module.exports = imageUpload;
