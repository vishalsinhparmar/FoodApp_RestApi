import express from 'express';
import { addfoodCategory, addsubCategoy, foodCategorydata } from '../../controller/Admin/admin.controller.js';
import upload from '../../config/clodinaryconfig.js';

const adminRoutes = express.Router();

adminRoutes.post('/addfoodCategory',upload.single('image'),addfoodCategory);
adminRoutes.post('/addsubCategory',upload.fields([
    {name:"coverimage",maxCount:1},
    {name:"image",maxCount:1}
]),addsubCategoy);

adminRoutes.get('/foodCategorydata',foodCategorydata);




export default adminRoutes;