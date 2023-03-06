const appEnv = require("dotenv").config();
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./${process.env.UPLOADS_FOLDER_PICS}`)
    }, 
    filename: function (req, file, cb) {
  
      if (file.mimetype != 'image/jpeg' && file.mimetype != 'image/webp') {
        cb(new Error('Wrong mime type'));
        return;
      }
      const newFileName = Date.now() +  Math.floor((Math.random() * 10000))+ file.originalname;
      cb(null, newFileName)
    }
  })
  
  module.exports.upload = multer({ storage })