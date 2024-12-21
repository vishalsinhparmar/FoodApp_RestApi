import mongoose  from "mongoose";

const Pricing = new mongoose.Schema({
    size:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
});




const CategorySchema = new mongoose.Schema({
    Categoryname:{
        type:String,
        required:true
    },

    categoryIteam:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'CategoryItem'
        }
    ],


   subcategories:[
    {
     type:mongoose.Schema.ObjectId,
     ref:"Subcategory"

    },
    
   ]

},{timestamps:true});

const Category = mongoose.model('Category',CategorySchema);

export default Category;