import {sendError, sendSuccess} from "../../utils/resHandler.js";
import jsonwebtoken from 'jsonwebtoken'
const verifyAuthenticateUser = async (req,res,next)=>{
   const token = req.headers.authorization?.split(" ")[1];
   console.log('the toke is a',token)
   if(!token){
       return sendError(res,"the user is unotherized",404);
   }
     try{
           jsonwebtoken.verify(token,process.env.JWT_SECRET,(err,user)=>{
            console.log('JWT_SECRET is',process.env.JWT_SECRET)
             if(err) { 
                              
               return sendError(res,'user have not authenticate',404)
             };
             req.user = user;
             console.log('the user is a',user)
             next();
          })
     }catch(err){
        console.log('the error message is',err)
     }
} 

export default verifyAuthenticateUser;