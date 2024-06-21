import express from "express";
import * as userAccountController from "../controller/userAccountController.js";
import { upload } from "../helper/uploadProfilePicture.js";

const router = express.Router();
3

router.post('/signup',upload.single('profilePicture'),userAccountController.signupController);

router.post('/login',userAccountController.loginController);

export default router;