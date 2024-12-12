import express from 'express'
import {UserSigUp,UserSigIn, getUser, verifyEmail, forgottenPassword, resetPassword} from '../../controller/auth/user.controller.js'
import upload from '../../config/clodinaryconfig.js';
import verifyAuthenticateUser from '../../middleware/authmiddleware.js';
const router = express.Router();

// routes.post('/SignIn',UserSigIn);
router.post('/SignUp',upload.single('image'),UserSigUp);
router.get('/verifyemail/:token',verifyEmail);
router.post('/SignIn',UserSigIn);
router.post('/forgopassword',forgottenPassword);
router.post('/resetpassword/:token',resetPassword);

router.get('/user',verifyAuthenticateUser,getUser);
// router.post('/upload',upload.single('image'),fileupload);

export default router;