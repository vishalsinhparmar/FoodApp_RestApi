import express from 'express';
// import {  addfoodCategoryItem, addsubCategoy, foodCategory,  foodcategorydatashow, foodCategoryItemdata, subfoodCategorydata } from '../../controller/Admin/admin.controller.js';
import upload from '../../config/clodinaryconfig.js';
import { categorydata, foodCategory, foodcategorydatashow, foodCategoryitemDelete, updateCategorybyId } from '../../controller/Admin/foodcategory.controller.js';
import { addfoodCategoryItem, foodCategorydelete, foodCategoryItemdata, updateCategoryitembyId } from '../../controller/Admin/categoryItem.controller.js';
import { addsubCategoy, subCategorydelete, subfoodCategorybyId, subfoodCategorydata, updatesubCategorybyId } from '../../controller/Admin/subcategory.controller.js';

const adminRoutes = express.Router();

// adding category
adminRoutes.post('/addfoodCategory',foodCategory);

adminRoutes.post('/addfoodCategoryitem',upload.single('image'),addfoodCategoryItem);
adminRoutes.post('/addsubCategory',upload.fields([
    {name:"coverimage",maxCount:1},
    {name:"image",maxCount:1}
]),addsubCategoy);
// getting a subcategory 
adminRoutes.get(`/categorydata`,categorydata);
adminRoutes.get(`/foodcategorydatashow`,foodcategorydatashow);
adminRoutes.get(`/foodCategoryItemdata/:category`,foodCategoryItemdata);
adminRoutes.get('/subfoodCategorydata/:category',subfoodCategorydata);

adminRoutes.get('/subCategorybyId/:id',subfoodCategorybyId);


// delete caegory
adminRoutes.delete('/foodCategoryDeletebyId/:category',foodCategorydelete);
adminRoutes.delete('/categoryItemDeletebyId/:category',foodCategoryitemDelete);
adminRoutes.delete('/subcategoryDeletebyId/:category',subCategorydelete);

// update category

adminRoutes.patch('/foodCategoryUpdatebyId/:id',updateCategorybyId);
adminRoutes.patch('/categoryItemupdatebyId/:id',upload.single('image'),updateCategoryitembyId);
adminRoutes.patch('/subcategoryUpdatebyId/:id',upload.fields([
    {name:"coverimage",maxCount:1},
    {name:"image",maxCount:1}
]),updatesubCategorybyId);












export default adminRoutes;