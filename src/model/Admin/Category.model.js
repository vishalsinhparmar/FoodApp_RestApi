import mongoose  from "mongoose";

const CategorySchema = new mongoose.Schema({
   categoryName:{
       type:String,
       require:true,
   },

   categorydetail:{
    type:String,
    require:true,
   },

   categoryfilepath:{
    type:String,
    require:true,
   },

   pricing:{
    type:String,
    require:true,
   }

},{timestamps:true});

const Category = mongoose.model('Category',CategorySchema);

export default Category;