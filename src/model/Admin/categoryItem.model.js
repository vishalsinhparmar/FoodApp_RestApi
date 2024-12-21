import mongoose from "mongoose"; 

const categoryItemschema = new mongoose.Schema({
        
       categoryItemName:{
            type:String,
            required:true,
         },   
     
        description:{
         type:String,
         required:true,
         },
         
        image:{
         type:String,
         required:true,
        },
      
        pricing:{
         type:Array,
         default:[]
        },
      
},{timestamps:true});

const CategoryItem = mongoose.model("CategoryItem",categoryItemschema);

export default CategoryItem;