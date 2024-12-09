import Category from "../../model/Admin/Category.model.js";
import { sendError, sendSuccess } from "../../../utils/resHandler.js";
import Subcaegory from "../../model/Admin/subCategory.model.js";
// import validateCategoryschema from "../../../utils/categoryvalidationSchema.js";

const addfoodCategory = async (req,res)=>{
    if(!req.file.path) return sendError(res,{message:"false"},400)

    
   // Bad Request       
    
    const  { Categoryname,categoryItemName,subcategories,description, pricing} = req.body;
         console.log('the subcategories',subcategories)
    try{
        const categoryfilepath = req.file.path;

        console.log('the originalfilepath',categoryfilepath)

         
       const Categorydata =  await Category.create(
            {
                Categoryname,
                categoryItemName,
                description,
                image:categoryfilepath,
                subcategories:subcategories,
                pricing:JSON.parse(pricing)
            }
        )

        sendSuccess(res,Categorydata,'category created successfully',201)

       
    }catch(err){
        console.log('the error occur in the addfoodCategory',err.message)
    }
}

const addsubCategoy = async (req,res)=>{
    const {subCategoryname} = req.body;
    console.log('the subcategories is ',subCategoryname)
    if(!req.file.path) return sendError(res,{message:"false"},400)

try{
    const coverfilepath = req.file.path;
    const subcategories = await Subcaegory.create({
        image:coverfilepath,
        subCategoryname,
    })

   if(!subcategories){
       sendError(res,{message:"false"},400)
   };

   sendSuccess(res,subcategories,"subcategorydata created successfully",201)
 
}catch(err){
  console.log('the error occur in the subfoodCategory',err.message)
}
}

const foodCategorydata = async (req,res)=>{
     const {category} = req.query;
     console.log('the req.query',req.query)
try{
    
    const foodCategory = await Category.find({Categoryname:category});

    if(!foodCategory){
        sendError(res,{message:"false"},400)
    };

    sendSuccess(res,foodCategory,"categorydata fetched successfully",200)
  
}catch(err){
   console.log('the error occur in the addfoodCategory',err.message)
}
}

export {
     addfoodCategory,
     foodCategorydata,
     addsubCategoy

}