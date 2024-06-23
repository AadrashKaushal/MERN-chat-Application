import express from "express";
import * as userAccountController from "../controller/userAccountController.js";
import { upload } from "../helper/uploadProfilePicture.js";
import { emailExists } from "../middlewares/emailExists.js";

const router = express.Router();

router.post('/signup',upload.single('profilePicture'),emailExists,userAccountController.signupController);

router.post('/login',userAccountController.loginController);

export default router;