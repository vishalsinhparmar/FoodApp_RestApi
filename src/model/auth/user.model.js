import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    filepath:{
        type:String,
        require:true
    },
    username:{

        type:String,
        require:true,
        
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isVerified:{
        type:Boolean,
        default:false,

    },
    resetToken:{
        type:String,
        default:null
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;
