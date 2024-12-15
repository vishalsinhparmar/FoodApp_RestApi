import express from 'express'
import { adminLogin, adminRegister, adminUserdata } from '../../controller/auth/admin.conroller.js';
import upload from '../../config/clodinaryconfig.js';
const router = express.Router();

router.post('/adminSignUp',upload.single('image') ,adminRegister);
router.post('/adminlogin',adminLogin);
router.get('/adminData',adminUserdata)
export default router;