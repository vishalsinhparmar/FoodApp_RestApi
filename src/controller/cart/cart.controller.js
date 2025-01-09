import crypto from 'crypto';
import { sendError, sendSuccess } from "../../../utils/resHandler.js";
import Cart from "../../model/Cart/cart.model.js";
import CartIteam from "../../model/Cart/cartItem.model.js";
import razorpay from "../../../utils/razorpay.js";
import Order from '../../model/Cart/order.model.js';
import mongoose from 'mongoose';
import Address from '../../model/Cart/address.model.js';

const addCardItem = async (req,res)=>{
    const {subcategoryId,qty,total} = req.body;
    console.log('req.body',req.body)
    const userId = req.user.sub
      try{
         
         
        const cartdata = await Cart.findOne({userId, isArchived:false}).populate('Iteam');
        
        console.log('the cart is',cartdata)
       if(!cartdata){
        
        let cartItemcreate = await CartIteam.create({
            subcategoryId,
            qty,
            total
        });
        console.log("the cartItemcreate",cartItemcreate)
 
        const cart =  await Cart.create({
          userId,
          Iteam:[cartItemcreate._id],
          subtotal:cartItemcreate.total,
          deliveryFee:50,
          isArchived:false
        });
        console.log('the cart is',cart)
        return  sendSuccess(res,cart,"the cart is created successfully",201)
      } 

       const existingCartIteam = cartdata.Iteam.find(item => item.subcategoryId.toString() === subcategoryId);
       console.log('the existingCartIteam',existingCartIteam);

       if(existingCartIteam){
          existingCartIteam.qty+=qty,
          existingCartIteam.total+=total
          cartdata.subtotal+=total
         await existingCartIteam.save();
         await cartdata.save();

        return sendSuccess(res,existingCartIteam,"the cartIteam added successfully",201)
       }
       
       const newCartIteam = await CartIteam.create({
           subcategoryId,
           qty,
           total
       });
      // for pushing this newCartIteam
        console.log('the newCartIteam',newCartIteam)
       cartdata.Iteam.push(newCartIteam._id)
       cartdata.subtotal+=total
       await cartdata.save();
       sendSuccess(res, cartdata, 200);

           
      }catch(err){
        console.log('the error occur is',err.message)
      }
}



const showallCartdata = async (req,res) => {
    

    try{
           const userid = req.user.sub
           if(!userid){
             return sendError(res,{user:"user have unotherized ! signin first"},404)
           }
           const cartDataforuser = await Cart.findOne({userId:userid, isArchived:false}).populate({
              path:'Iteam',                                              
              populate:{
                path:'subcategoryId',
                select:'subCategoryname image'
              }
           })
         
          //  const setcart = cartDataforuser.flat()
           console.log('the cartDataforuser',cartDataforuser)
           if(!cartDataforuser){
               return sendError(res,{user:"user unotherized"},404)
           }

           if (!cartDataforuser|| cartDataforuser.length === 0) {
            return sendError(res, "No cart data found for this user", 404);
          }
          // const totalprice = await Cart.find(userId)
            
        
          

          sendSuccess(res,cartDataforuser,200);
         
    }catch(err){
      console.log('the error occur in the cartdataforUser',err.message)
    }
};


const cartCategorydelete = async (req,res)=>{
        const {deleteId} = req.params;
        console.log('deleteID is',deleteId)

        if(!mongoose.Types.ObjectId.isValid(deleteId)) return sendError(res,'invalid item id',400)
        try{
            const cart = await Cart.findOne({userId:req.user.sub,isArchived:false}).populate('Iteam');
            console.log("this is cart for the deletd item",cart)
            if(!cart){
              return sendError(res,"cart is not found",404)
            }

            const iteamtoDelete = cart.Iteam.find(item => item._id.toString() === deleteId);
            console.log('the deletedData is',iteamtoDelete)
            if(!iteamtoDelete) {
              return sendError(res,"item is not found in cart",404)
            }

            await CartIteam.findByIdAndDelete(deleteId);
            const fillterval = cart.Iteam.filter((item)=> item._id.toString() !== deleteId);
            console.log('fillter value is',fillterval)
            cart.Iteam = fillterval
            cart.subtotal -= iteamtoDelete.total
            await cart.save();
            // console.log('the deleteData is',deleteData);
            
            
            sendSuccess(res,"item is deleted successfull",200);
        }catch(err){
             console.log('the error occur in the cartCategorydelete',err.message)
             sendError(res, "Internal server error", 500);
        }
}

const razorpayOrderid = async (req,res)=>{
       const userId = req.user.sub;

       try{
            const cartData = await Cart.findOne({userId}).populate('Iteam');
            console.log('the cartData',cartData);
            const options = {
              amount:cartData.grandtotal*100,
              currency:"INR",
              receipt:"order_rcptid_11"
            }

           const order =await razorpay.orders.create(options);
           console.log('the order is provide',order)

           sendSuccess(res,{orderId:order.id,key:process.env.RAZORPAY_ID,amount:order.amount})

       }catch(err){
        console.log("the errror in the razorpay for order create",err.message)
       }

}

const checkOut = async (req,res)=>{
   const paymentDetail = req.body;
   console.log("paymentDetail",paymentDetail)
   if(!req.body){
      return sendError(res,"not provide valid detail",404)
   }

   try{
       
      const cart = await Cart.findOne({userId:req.user.sub, isArchived:false}).populate("Iteam");
      
      console.log('the cart is',cart);

      if(!cart || cart.Iteam.length === 0) return sendError(res,"Cart is empty",404)

        const deliveryFee = 50;
        // const grandTotal = cart.subtotal + deliveryFee;  
               
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = paymentDetail;
        console.log('razorpay_signature',razorpay_signature);
        const generatedSignature = crypto.
                                  createHmac('sha256',process.env.RAZORPAY_SECRET)
                                  .update(razorpay_order_id +"|"+ razorpay_payment_id)
                                  .digest('hex');
        console.log('generatedSignature',generatedSignature);

        if(generatedSignature !== razorpay_signature){
           return sendError(res,"payment are not successfully happen ")
        }

        const addresList = await Address.find({userId:req.user.sub}) 
         console.log()
        if(!addresList){
          return sendError(res,"user have not find any address",404)
        };
        const address = addresList.filter(add => add.isSelected === true);
        console.log("address",address);
        const ordercreate = await Order.create({
           userId:req.user.sub,
           cartItem:cart._id,
           grandTotal:cart.grandtotal,
           deliveryAddress:address[0].address,
           paymentStatus:'success'
        });

        const deleteCart = await Cart.updateOne({_id:cart._id},{isArchived:true});
         
        console.log('deleteCart',deleteCart)

        console.log('the order is create',ordercreate)
        
         sendSuccess(res,'order is created successfully',201)
      
   } catch(err){
     console.log('the error occur in checkOut',err.message)
   }
}

const userOrder =  async (req,res) => {
     try{
         
         const userOrder = await Order.find({userId:req.user.sub})
         .populate({
          path: 'cartItem',  // Populate the Cart object
          populate: {
              path: 'Iteam',  // Populate the Cart Items (Iteam field in Cart)
              populate: {
                  path: 'subcategoryId',  // Populate the Subcategory within CartIteam
                  select: 'subCategoryname image'  // Select the subcategory's name and image
              }
          }
      });
         if(!userOrder) return sendError(res,'the user have not any order',404)

        sendSuccess(res,userOrder,200);

        
     }catch(err){
      console.log('the error in the userOrder',err.message)
     }
}

const AddressDetail = async(req,res)=>{
  const {address} = req.body;
  
   try{
    if(!address){
       return sendError(res,"please provide a address first",404)
    }

    const userId = req.user.sub;
    if(!userId){
      return sendError(res,"user is not authenticate")
    }

    const addressDetail = await Address.create({
      address,
      userId
    })
    
    console.log("addressDetail are showing",addressDetail);

    if(!addressDetail){
       return sendError(res,"something went wrong with address",404)
    }

    sendSuccess(res,addressDetail,"address detail",201)

   }catch(err){
    console.log("error occur in the AddressDetail",err.message)
   }
}

const showAddress = async(req,res)=>{
  
   try{
    const userId = req.user.sub;
    if(!userId){
      return sendError(res,"user is not authenticate")
    }
    const addresList = await Address.find({userId:userId}) 

     if(!addresList){
       return sendError(res,"user have not find any address",404)
     };

     console.log("addresList",addresList);

    sendSuccess(res,addresList,"address detail",201)

   }catch(err){
    console.log("error occur in the AddressDetail",err.message)
   }
}

const selectedAddress = async (req,res)=>{
  const {addressId} = req.body 
  console.log('addressId is',addressId)
  try{
      
    const userId = req.user.sub;
    if(!userId){
      return sendError(res,"user is not authenticate")
    }
      
     if(!addressId){
      return sendError(res,"user have not selected any address",404)
    };
      
    await Address.updateMany({userId},{$set:{isSelected:false}});

     
     const updateAddress = await Address.findByIdAndUpdate(addressId,{$set:{isSelected:true}})
     console.log('updateAddress',updateAddress);

     const cart = await Cart.findOneAndUpdate(
       {userId},
      {address:addressId},
      {new:true}
     );

     console.log("updated cart with new address",cart);

     sendSuccess(res,cart,"successfully address are added",201)
  }catch(err){
    console.log("error occur in the selectedAddress",err.message)
  }
}

export {
    
    showallCartdata,
    cartCategorydelete,
    addCardItem,
    razorpayOrderid,
    checkOut,
    userOrder,
    AddressDetail,
    showAddress,
    selectedAddress,
   
};

