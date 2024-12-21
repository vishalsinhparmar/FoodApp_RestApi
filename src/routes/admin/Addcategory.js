import express from 'express';
// import {  addfoodCategoryItem, addsubCategoy, foodCategory,  foodcategorydatashow, foodCategoryItemdata, subfoodCategorydata } from '../../controller/Admin/admin.controller.js';
import upload from '../../config/clodinaryconfig.js';
import { foodCategory, foodcategorydatashow, foodCategoryitemDelete } from '../../controller/Admin/foodcategory.controller.js';
import { addfoodCategoryItem, foodCategorydelete, foodCategoryItemdata } from '../../controller/Admin/categoryItem.controller.js';
import { addsubCategoy, subCategorydelete, subfoodCategorydata } from '../../controller/Admin/subcategory.controller.js';

const adminRoutes = express.Router();

// adding category
adminRoutes.post('/addfoodCategory',foodCategory);

adminRoutes.post('/addfoodCategoryitem',upload.single('image'),addfoodCategoryItem);
adminRoutes.post('/addsubCategory',upload.fields([
    {name:"coverimage",maxCount:1},
    {name:"image",maxCount:1}
]),addsubCategoy);
// getting a subcategory 
adminRoutes.get(`/foodcategorydatashow`,foodcategorydatashow);
adminRoutes.get(`/foodCategorydata/:category`,foodCategoryItemdata);
adminRoutes.get('/subfoodCategorydata/:category',subfoodCategorydata);

// delete caegory
adminRoutes.delete('/foodCategoryDeletebyId/:category',foodCategorydelete);
adminRoutes.delete('/categoryItemDeletebyId/:category',foodCategoryitemDelete);
adminRoutes.delete('/subcategoryDeletebyId/:category',subCategorydelete);









export default adminRoutes;