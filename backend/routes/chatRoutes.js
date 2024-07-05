import express from 'express';
import * as chatsController from '../controller/chatsController.js';
import { jwtVerification } from '../middlewares/jwtVerification.js';
import { chatExists } from '../middlewares/chatExists.js';

const router = express.Router();

router.get('/userProfile',jwtVerification,chatsController.getUserProfileController);

router.get('/searchUsers',jwtVerification,chatsController.searchUserController);

router.post('/chats',jwtVerification,chatExists,chatsController.userChatsController);

router.post('/groupChats',jwtVerification,chatsController.groupChatsController);

router.post('/viewGroupChats',jwtVerification,chatsController.viewGroupChatController);

router.put('/deleteUsers',jwtVerification,chatsController.deleteUserController);

router.put('/updateChatname',jwtVerification,chatsController.updateChatnameController);

router.get('/myChats',jwtVerification,chatsController.getUserChatsController);

export default router;