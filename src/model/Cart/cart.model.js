
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
    deliveryFee:{
        type:Number,
        require:true,
        default:50
    },
    grandtotal:{
        type:Number,
        require:true,
        default:0
    },
    discount:{
        type:Number,
        require:true,
        default:0
    }

 

},{timestamps:true});

Cartschema.pre("save",function(next){
    this.grandtotal = this.subtotal + this.deliveryFee + this.discount;
    next();
})
const Cart = mongoose.model('Cart',Cartschema);

export default Cart