import mongoose  from "mongoose";

const SubcategorySchema = new mongoose.Schema({
    coverimage:{
        type:String,
        require:true
    },
    subCategoryname:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        default:1
    }
});

const Subcategory = mongoose.model('Subcategory',SubcategorySchema)

export default Subcategory;