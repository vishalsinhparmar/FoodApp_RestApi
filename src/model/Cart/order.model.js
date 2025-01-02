
import mongoose from "mongoose";

const Orderschema = new mongoose.Schema({
         userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
         },
         cartItem:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"Cart"
         },
      
       
         grandTotal:{
            type:Number,
            require:true
         },
         deliveryAddress:{
            type:String,
            require:true
         },
         paymentStatus:{
            type:String,
            require:true
         }
},{timestamps:true});

const Order = mongoose.model('Order',Orderschema);

export default Order;