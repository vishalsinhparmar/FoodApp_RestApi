import mongoose  from "mongoose";

const SubcategorySchema = new mongoose.Schema({
    coverimage:{
        type:String,
        
    },
    subCategoryname:{
        type:String,
        required:true
    },
    image:{
        type:String,
        require:true
    },
    count:{
        type:Number,
        default:1
    }
});

const Subcategory = mongoose.model('Subcategory',SubcategorySchema)

export default Subcategory;