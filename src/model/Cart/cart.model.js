
import mongoose from "mongoose";

const Cartschema = new mongoose.Schema({
  
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    subcategoryId:[{
        type:mongoose.Types.ObjectId,
        ref:'Subcaegory'
    }],
  
    subtotal:{
        type:Number,
        require:true,
        default:0 
    },

 

},{timestamps:true});


const Cart = mongoose.model('Cart',Cartschema);

export default Cart