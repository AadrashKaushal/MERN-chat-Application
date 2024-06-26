import express from 'express';
import * as chatsController from '../controller/chatsController.js';
import { jwtVerification } from '../middlewares/jwtVerification.js';
const router = express.Router();

router.get('/userProfile',jwtVerification,chatsController.getUserProfileController);

router.get('/searchUsers',jwtVerification,chatsController.searchUserController);

router.post('/chats',jwtVerification,chatsController.userChatsController);

export default router;