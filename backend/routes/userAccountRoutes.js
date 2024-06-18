import express from "express";
import * as userAccountController from "../controller/userAccountController.js";
import { upload } from "../helper/uploadProfilePicture.js";

const router = express.Router();

router.post('/signup',upload.single('profilePicture'),userAccountController.signupController);

export default router;