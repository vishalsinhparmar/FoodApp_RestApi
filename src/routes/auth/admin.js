import express from 'express'
import { AdminallUser, adminLogin, adminRegister, adminUserdata, getArchivedCarts } from '../../controller/auth/admin.conroller.js';
import upload from '../../config/clodinaryconfig.js';
const router = express.Router();

router.post('/adminSignUp',upload.single('image') ,adminRegister);
router.post('/adminlogin',adminLogin);
router.get('/adminData',adminUserdata)
router.get('/Userdetail',AdminallUser);
router.get('/ArchivedOrder/:id',getArchivedCarts);


export default router;