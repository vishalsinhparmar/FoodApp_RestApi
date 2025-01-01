import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
     address:{
        type:String,
        require:true,
     },

     userId:{
        type:String,
        require:true
     },

     isSelected:{
        type:Boolean,
        default:false
     }

},{timestamps:true});

const Address = mongoose.model("Address",AddressSchema);

export default Address;