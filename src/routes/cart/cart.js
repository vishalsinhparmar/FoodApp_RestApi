import express from 'express';
import verifyAuthenticateUser from '../../middleware/authmiddleware.js';
import { addCartdetail, showallCartdata } from '../../controller/cart/cart.controller.js';
import addCartadditionalInfo from '../../controller/cart/informationdetail.controller.js';


const adminRoutes = express.Router();

adminRoutes.post('/addCart',verifyAuthenticateUser,addCartdetail);
adminRoutes.post('/addinfoCart/:id',verifyAuthenticateUser,addCartadditionalInfo);
adminRoutes.get('/cartdetail',verifyAuthenticateUser,showallCartdata);




export default adminRoutes;