
import mongoose from "mongoose";

const additionalInfoschema = new mongoose.Schema({
  
    detailinfo:{
        type:String,
        required:true
    }
    

},{timestamps:true});


const AdditonalInfo = mongoose.model('AdditonalInfo',additionalInfoschema);

export default AdditonalInfo;