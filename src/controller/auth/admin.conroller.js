import { sendError, sendSuccess } from "../../../utils/resHandler.js";
import Admin from "../../model/auth/admin.model.js";

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




export {adminRegister,adminLogin,adminUserdata}