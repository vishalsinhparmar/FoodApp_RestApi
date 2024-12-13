
import mongoose from "mongoose";

const Cartschema = new mongoose.Schema({
  
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
     
       Iteam:[{
        type:mongoose.Types.ObjectId,
        ref:'CartIteam'
       }
    ],
  
    subtotal:{
        type:Number,
        require:true,
        default:0 
    },

 

},{timestamps:true});


const Cart = mongoose.model('Cart',Cartschema);

export default Cart