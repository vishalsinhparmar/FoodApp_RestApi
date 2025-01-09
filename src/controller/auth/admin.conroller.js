import { sendError, sendSuccess } from "../../../utils/resHandler.js";
import Admin from "../../model/auth/admin.model.js";
import User from "../../model/auth/user.model.js";
import Cart from "../../model/Cart/cart.model.js";
import Order from "../../model/Cart/order.model.js";

const adminRegister = async (req,res)=>{
    const {username,password} = req.body;
    const filepath = req.file.path;

    try{
        if(!filepath) {
            sendError(res,'file path is not found',401)
            return;
        } 
     const adminSinIn =  await Admin.create({
            username,
            password,
            filepath
         });

         console.log('adminSignIn',adminSinIn);

         sendSuccess(res,'admin sigin',201);

    }catch(err){
        console.log('error occur in the admin',err)
    }

};
const adminLogin = async (req,res)=>{
    const {username,password} = req.body;
     console.log("req.body of admin",req.body);
    if(!username || !password){
        return sendError(res,'admin is not valid',200)
    }
    try{
         
       const user = await Admin.findOne({username})
       if(!user) return sendError(res,"admin are not authenticated",401)

         console.log('adminSignIn',user);

         sendSuccess(res,'admin successfully login',201);

    }catch(err){
        console.log('error occur in the admin',err)
    }

};
const adminUserdata = async (req,res)=>{
    try{
         
        const userAdmin = await Admin.findOne();
        
        
          console.log('admin data',userAdmin);
 
          sendSuccess(res,{userAdmin},201);
 
     }catch(err){
         console.log('error occur in the admin',err)
     }
    }

    const AdminallUser = async (req, res) => {
   
       try {
         const userData = await User.find();
         console.log("the userData is", userData);
         if (!userData) {
           return sendError(res, "User not found", 401);
         }
         sendSuccess(res,userData, "user data are successfull fetch", 200)
       } catch (err) {
         return res.status(501).send({ message: 'Error to retriviving a data', error: err.message });
     
       }
     }

     const getArchivedCarts = async (req, res) => {
        const {id} = req.params;
        console.log("user id",id)
        
        try {
            if(!id){
                return sendError(res,"user id not found",404)
            }
           const archivedCarts = await Cart.find({ userId:id, isArchived: true }) 
            .populate({
           // Populate the Cart object
          
                path: 'Iteam',  // Populate the Cart Items (Iteam field in Cart)
                populate: {
                    path: 'subcategoryId',  // Populate the Subcategory within CartIteam
                    select: 'subCategoryname image'  // Select the subcategory's name and image
                }
                
        }).populate("address");
           if (!archivedCarts || archivedCarts.length === 0) {
              return sendError(res, "No archived carts found", 404);
           }
      
           sendSuccess(res, archivedCarts, 200);
        } catch (err) {
           console.error("Error in getArchivedCarts:", err.message);
           sendError(res, "Something went wrong", 500);
        }
      };


export {adminRegister,adminLogin,adminUserdata,AdminallUser,getArchivedCarts}