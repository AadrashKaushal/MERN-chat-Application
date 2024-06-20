import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'profilePictures/');
    },
    filename: function (req, file, cb) {
      cb(null, `${req.body.email}${path.extname(file.originalname)}`)
    }
  })

  export const upload = multer({ storage: storage });