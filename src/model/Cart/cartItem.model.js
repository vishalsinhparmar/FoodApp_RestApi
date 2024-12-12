
import mongoose from "mongoose";

const CartIteamschema = new mongoose.Schema({
  

    subcategoryId:{
        type:mongoose.Types.ObjectId,
        ref:'Subcategory'
    },
    qty:{
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


const CartIteam = mongoose.model('CartIteam',CartIteamschema);

export default CartIteam;