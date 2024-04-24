const multer = require("multer");
const path = require("path");

//CONFIGURATION FOR MULTER 

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/category/') // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Keep original filename
  }
});
  
  const upload = multer({ storage: storage })


  

  module.exports = upload ;