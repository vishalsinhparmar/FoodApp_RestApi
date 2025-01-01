import express from 'express';
import verifyAuthenticateUser from '../../middleware/authmiddleware.js';
import { addCardItem, AddressDetail, cartCategorydelete, checkOut, razorpayOrderid, selectedAddress, showAddress, showallCartdata, userOrder } from '../../controller/cart/cart.controller.js';
import addCartadditionalInfo from '../../controller/cart/informationdetail.controller.js';


const adminRoutes = express.Router();

adminRoutes.post('/addCart',verifyAuthenticateUser,addCardItem);
adminRoutes.post('/addinfoCart/:id',verifyAuthenticateUser,addCartadditionalInfo);
adminRoutes.get('/cartdetail',verifyAuthenticateUser,showallCartdata);
adminRoutes.delete('/deleteCartcategory/:deleteId',verifyAuthenticateUser,cartCategorydelete);

adminRoutes.post('/create_order',verifyAuthenticateUser,razorpayOrderid);
adminRoutes.post('/verify_order',verifyAuthenticateUser,checkOut);
adminRoutes.get('/userOreder',verifyAuthenticateUser,userOrder);

// address
adminRoutes.post('/addAddress',verifyAuthenticateUser,AddressDetail);
adminRoutes.get('/showAddress',verifyAuthenticateUser,showAddress);
adminRoutes.post('/selectAddress',verifyAuthenticateUser,selectedAddress);






export default adminRoutes;