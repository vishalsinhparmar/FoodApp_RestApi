import express from 'express';
import verifyAuthenticateUser from '../../middleware/authmiddleware.js';
import { addCardItem, cartCategorydelete, showallCartdata } from '../../controller/cart/cart.controller.js';
import addCartadditionalInfo from '../../controller/cart/informationdetail.controller.js';


const adminRoutes = express.Router();

adminRoutes.post('/addCart',verifyAuthenticateUser,addCardItem);
adminRoutes.post('/addinfoCart/:id',verifyAuthenticateUser,addCartadditionalInfo);
adminRoutes.get('/cartdetail',verifyAuthenticateUser,showallCartdata);
adminRoutes.delete('/deleteCartcategory/:deleteId',verifyAuthenticateUser,cartCategorydelete);





export default adminRoutes;