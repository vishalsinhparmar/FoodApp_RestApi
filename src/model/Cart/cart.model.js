
import mongoose from "mongoose";

const Cartschema = new mongoose.Schema({
  
    userid:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    subcategoryid:{
        type:mongoose.Types.ObjectId,
        ref:'Subcaegory'
    },
    qty:{
       type:Number,
       require:true,
       default:0
    },
    subtotal:{
        type:Number,
        require:true,
        default:0 
    },
    total:{
        type:Number,
        require:true,
        default:0 
    },
    additionalInfo:{
        type:Object,
        default:null
    }

},{timestamps:true});


const Cart = mongoose.model('Cart',Cartschema);

export default Cart