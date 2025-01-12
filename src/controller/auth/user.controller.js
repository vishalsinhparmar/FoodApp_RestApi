import crypto from 'crypto';
import User from '../../model/auth/user.model.js'
import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import sendMailUtils from '../../../utils/nodeailerfile.js';
import { sendError, sendSuccess } from '../../../utils/resHandler.js';




const FRONTEND_URI = process.env.NODE_ENV === 'production' 
  ? process.env.FRONTEND_URI
  : process.env.FRONTEND_URI_LOCAL;

  console.log("FRONTEND_URI for user",FRONTEND_URI)

const UserSigIn = async (req, res) => {
  console.log("the header is", req.headers)
  const { email, password } = req.body;
  console.log("the reqbody for the", req.body)
  console.log("the email", email)
  console.log("the password", password)

  try {
    const existUser = await User.findOne({ email: email });
    console.log('the existUser is', existUser)
    if (!existUser) {
      //    return res.status(401).send({message:"the user is not exists"})
      return sendError(res, {   email:"the user is not exists you can provide a correct email"}, 404 )
    }
    if (!existUser.isVerified) {
      //   return res.status(401).send({message:"the user is not verified"})
      return sendError(res, "the user is not verified", 401)
    }
    const comparePassword = await bcryptjs.compare(password, existUser.password);
    console.log("the compare password is ", comparePassword);

    if (!comparePassword) {
      //    return res.status(401).send({message:"invalid Credentials"})
     return sendError(res,{ password:"invalid Credentials ! password are not correct please check the password or forgottenPassword"}, 401)

    }

    const token = jsonwebtoken.sign({ sub: existUser.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log("the token is a", token)
    // res.cookie("jsontoken",token,{httpOnly:true})
    // res.status(201).send({message:"the user is looged in successfull",token})

    sendSuccess(res,{token}, "user signIn successfull", 200);




  } catch (err) {
    // res.status(401).send({message:err.message})
    // return sendError(res, "invalid request from the user", 404);
    console.error("error message for sigin",err.message)

  }
}
const getUser = async (req, res) => {
   const userId = req.params
   console.log('userId',userId)
  try {
    const userData = await User.findOne({ _id:req.user.sub });
    console.log("the userData is", userData);
    if (!userData) {
      return sendError(res, "User not found", 401);
    }
    sendSuccess(res, { username: userData.username, image: userData.filepath }, "user data are successfull fetch", 200)
  } catch (err) {
    return res.status(501).send({ message: 'Error to retriviving a data', error: err.message });

  }
}
const UserSigUp = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(`usename:${username} and password:${password} and email:${email}`)

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return sendError(res, {email:"user have already sigUp please sigIn or using a different email"}, 404)

    }
    const hashPassword = await bcryptjs.hash(password, 10);
    console.log('the hashPassword is a', hashPassword);
    
    const filepath = req.file?.path || null;
    if (filepath) {
      console.log("File path provided:", filepath);
    } else {
      console.log("No file path provided, proceeding without an image.");
    }
    console.log("the filepath is a", filepath)
    const newUser = await User.create({
      filepath,
      username,
      email,
      password: hashPassword,

    })
    const verifyToken = jsonwebtoken.sign({ id: newUser._id }, process.env.JWT_SECRET);
    console.log('the signUp have the verifyToken', verifyToken)
    const verifyEmailLink = `${FRONTEND_URI}/auth/verifyemail/${verifyToken}`;
    console.log('the verify email link is', verifyEmailLink)
    await sendMailUtils(email, "verify your email", `click this email to verify your email:${verifyEmailLink}`)
    console.log('the newUser', newUser)


    // res.status(201).send({message:"success",user:newUser})
    sendSuccess(res, "user have successfull register", 201)
  } catch (err) {
    return res.status(501).send({ errMessage: err.message })
  }
};
// verify email using a nodemailer
const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (!user) {
      return sendError(res,"user is not registered please registered first",404)
    };
    const userdetail = await User.findOne({ _id:user.id });
    console.log('the user for the verifyUser', user);
    console.log('the user for the verifyUse userdetail', userdetail);

    userdetail.isVerified = true;
    await userdetail.save();

    sendSuccess(res,"user have successfully verified email",200)
    //  this is for verification that the user is verified or not after you can interegate a third api

  } catch (err) {
    res.status(404).send({ message: 'the user is unotherized', err: err.message })
  }
}
const forgottenPassword = async (req, res) => {
  const { email } = req.body;
  console.log('the email is the', email)
  try {
    const emailuser = await User.findOne({ email });
    console.log('the email user is', emailuser);
    if (!emailuser) {
      return sendError(res,{email:"the user is unotherized ! not find email"},404)
    }
    if (!emailuser.isVerified) {
      return sendError(res,"user is not verified ! please verified first",404)
    };

    const resetToken = crypto.randomBytes(32).toString('hex');
    console.log('the reset password resetToken', resetToken);
    emailuser.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    await emailuser.save();
    console.log('with token have the hashing is', emailuser.resetToken);

    const resetPasslink = `${FRONTEND_URI}/auth/NewPassword/${resetToken}`;
    //  this is for verification that the user is verified or not after you can interegate a third api

    await sendMailUtils(email, 'password reset', `click to verify password:${resetPasslink}`);
    sendSuccess(res,"user have verified a email successfull",200)
  } catch (err) {
    return res.status(404).send({ message: 'the user is unotherized', err: err.message })
  }
}
//  for the reset  password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newpassword } = req.body;
  try {
    const hashedtoken = crypto.createHash('sha256').update(token).digest('hex');
    console.log('the hashedtoken for the reset password', hashedtoken)
    const user = await User.findOne({
      resetToken:hashedtoken
    });
     console.log("user is",user);

    if(!user) {
      return sendError(res,"invalid credential ! something went wrong",404)
    }

    user.password = await bcryptjs.hash(newpassword, 10);
    user.resetToken = null;
    await user.save();

    sendSuccess(res,"password reset successfully",201)
  } catch (err) {
    return sendError(res,err.meessage,"error occur in this",404)
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