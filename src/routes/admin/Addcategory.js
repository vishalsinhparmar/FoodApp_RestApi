import express from 'express';
import { addfoodCategory, addsubCategoy, foodCategorydata, subfoodCategorydata } from '../../controller/Admin/admin.controller.js';
import upload from '../../config/clodinaryconfig.js';

const adminRoutes = express.Router();

adminRoutes.post('/addfoodCategory',upload.single('image'),addfoodCategory);
adminRoutes.post('/addsubCategory',upload.fields([
    {name:"coverimage",maxCount:1},
    {name:"image",maxCount:1}
]),addsubCategoy);
// getting a subcategory or catef
adminRoutes.get('/foodCategorydata/?category=category',foodCategorydata);
adminRoutes.get('/subfoodCategorydata',subfoodCategorydata);





export default adminRoutes;