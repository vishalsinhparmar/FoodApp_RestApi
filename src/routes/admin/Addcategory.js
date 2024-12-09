import express from 'express';
import { addfoodCategory } from '../../controller/Admin/admin.controller';
import upload from '../../config/clodinaryconfig';

const adminRoutes = express.Router();

adminRoutes.post('addfoodCategory',upload.single('image'),addfoodCategory);


export default adminRoutes;