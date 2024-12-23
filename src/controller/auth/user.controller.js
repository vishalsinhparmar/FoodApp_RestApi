import crypto from 'crypto';
import  User from '../../model/auth/user.model.js'
import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import sendMailUtils from '../../../utils/nodeailerfile.js';
import { sendError } from '../../../utils/resHandler.js';

const UserSigIn = async (req,res)=>{
  console.log("the header is",req.headers)
     const {email,password} = req.body;
     console.log("the reqbody for the",req.body)
     console.log("the email",email)
     console.log("the password",password)

     try{
         const existUser = await User.findOne({email:email});
         console.log('the existUser is',existUser)
         if(!existUser){
        //    return res.status(401).send({message:"the user is not exists"})
           sendError(res,"the user is not exists",401)       
         }
         if(!existUser.isVerified){
        //   return res.status(401).send({message:"the user is not verified"})
          sendError(res,"the user is not verified",401)       
        }
         const comparePassword = await bcryptjs.compare(password,existUser.password); 
         console.log("the compare password is ",comparePassword);

         if(!comparePassword){
        //    return res.status(401).send({message:"invalid Credentials"})
          sendError(res,"invalid Credentials",401)       

         }

      const token = jsonwebtoken.sign({sub:existUser.id},process.env.JWT_SECRET,{expiresIn:'7d'});
        console.log("the token is a",token)
      // res.cookie("jsontoken",token,{httpOnly:true})
      res.status(201).send({message:"the user is looged in successfull",token})

        

     }catch(err){
      res.status(401).send({message:err.message})
        
     }
}
const getUser = async (req,res)=>{
   try{
     const userData = await User.findOne({_id:req.user.sub});
     console.log("the userData is",userData);
     if(!userData){
       return res.status(404).send({ message: 'User not found' });
     }
     res.status(201).send({username:userData.username,image:userData.filepath})
   }catch(err){
    return res.status(501).send({ message: 'Error to retriviving a data',error:err.message });
      
   }
}
const UserSigUp = async (req,res)=>{
     const {username,email,password} = req.body;
    console.log(`usename:${username} and password:${password} and email:${email}`)

     try{
      const existUser = await User.findOne({email});
      if(existUser){
       return res.status(401).send({message:"use already register"})
          
      }
      const hashPassword = await bcryptjs.hash(password,10);
      console.log('the hashPassword is a',hashPassword);
      const filepath = req.file.path;
      console.log("the filepath is a",filepath)
        const newUser = await User.create({
          filepath:filepath,
           username,
           
           email,
           password:hashPassword,
           
         })
         const verifyToken = jsonwebtoken.sign({id:newUser._id},process.env.JWT_SECRET);
         console.log('the signUp have the verifyToken',verifyToken)
         const verifyEmailLink = `http://localhost:8000/verifyemail/${verifyToken}`;
         console.log('the verify email link is',verifyEmailLink)
         await sendMailUtils(email,"verify your email",`click this email to verify your email:${verifyEmailLink}`)
         console.log('the newUser',newUser)
        
      
      res.status(201).send({message:"success",user:newUser})
     }catch(err){
       return res.status(501).send({errMessage:err.message})
     }
};
// verify email using a nodemailer
const verifyEmail = async (req,res)=>{
  const {token} = req.params;
  try{
        const user = jsonwebtoken.verify(token,process.env.JWT_SECRET);
        const userdetail = await User.findOne({_id:user.id});
        console.log('the user for the verifyUser',user);
        console.log('the user for the verifyUse userdetail',userdetail);


       if(!user){
         res.status(404).send({message:'the user have not registered'});
       };

       userdetail.isVerified = true;
       await userdetail.save();
      
       res.status(200).send({message:'the user have successfully verify email'});
       //  this is for verification that the user is verified or not after you can interegate a third api

  }catch(err){
   res.status(404).send({message:'the user is unotherized',err:err.message})
  }  
}
const forgottenPassword = async (req,res)=>{
       const {email} = req.body;
       console.log('the email is the',email)
       try{
            const emailuser = await User.findOne({email});
            console.log('the email user is',emailuser);
            if(!emailuser){
             return res.status(404).send({message:'the user is unotherized'});
            }
            if(!emailuser.isVerified){
             return res.status(404).send({message:'the user is not verified'});
            };

            const resetToken = crypto.randomBytes(32).toString('hex');
            console.log('the reset password resetToken',resetToken);
            emailuser.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
            await emailuser.save();
            console.log('with token have the hashing is',emailuser.resetToken);

            const resetPasslink = `http://localhost:5173/newPassword/${resetToken}`;
            //  this is for verification that the user is verified or not after you can interegate a third api
            
            await sendMailUtils(email,'password reset',`click to verify password:${resetPasslink}`);
            res.status(200).send({messge:'successfully sent a verify link'})
       }catch(err){
        return res.status(404).send({message:'the user is unotherized',err:err.message})
       }
}
//  for the reset  password
const resetPassword = async (req,res)=>{
  const {token} = req.params;
  const {newpassword} = req.body;
  try{
        const hashedtoken = crypto.createHash('sha256').update(token).digest('hex');
        console.log('the hashedtoken for the reset password',hashedtoken)
        const user = await User.findOne({
          resetToken:hashedtoken
        });

       if(!user){
        return res.status(404).send({message:'invalid token'});
       }
        
      user.password = await bcryptjs.hash(newpassword,10);
      user.resetToken = null;
      await user.save();
     
      res.status(200).send({message:'password reset successfull'})
  }catch(err){
   return res.status(404).send({message:'the user is unotherized',err:err.message})
  }
}
export {
      UserSigIn,
      UserSigUp,
      getUser,
      verifyEmail,
      forgottenPassword,
      resetPassword
    }