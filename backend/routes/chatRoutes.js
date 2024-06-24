import express from 'express';
import * as chatsController from '../controller/chatsController.js';
import { jwtVerification } from '../middlewares/jwtVerification.js';
const router = express.Router();

router.get('/userProfile',jwtVerification,chatsController.getUserProfileController);

export default router;