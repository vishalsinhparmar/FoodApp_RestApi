import Category from "../../model/Admin/Category.model.js";
import { sendError, sendSuccess } from "../../../utils/resHandler.js";
import Subcaegory from "../../model/Admin/subCategory.model.js";
// import validateCategoryschema from "../../../utils/categoryvalidationSchema.js";

const addfoodCategory = async (req,res)=>{
    if(!req.file.path) return sendError(res,{message:"false"},400)

    
   // Bad Request       
    
    const  { Categoryname,categoryItemName,description, pricing} = req.body;
         console.log('the subcategories')
    try{
        const categoryfilepath = req.file.path;

        console.log('the originalfilepath',categoryfilepath)

         
       const Categorydata =  await Category.create(
            {
                Categoryname,
                categoryItemName,
                description,
                image:categoryfilepath,
                
                pricing:JSON.parse(pricing)
            }
        )

        sendSuccess(res,Categorydata,'category created successfully',201)

       
    }catch(err){
        console.log('the error occur in the addfoodCategory',err.message)
    }
}

const addsubCategoy = async (req,res)=>{
    const {subCategoryname,categoryId} = req.body;
    console.log('the subcategories is ',subCategoryname)
    console.log("the file path is",req.files)
    // if(!req.file.path) return sendError(res,{message:"false"},400)

try{
    const categoryfile = req.files.image[0]?.path;
    const coverimagefile = req.files.coverimage[0]?.path;

    const subcategories = await Subcaegory.create({
        coverimage:categoryfile,
        image:coverimagefile,
        subCategoryname,
    })

    const updateCategory = await Category.findByIdAndUpdate(
        categoryId,
        {
          $push:{subcategories:subcategories._id}        
        },

          {new:true}
    );

    

    console.log("the pushing item is",updateCategory)

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
     console.log('the query is',req.query)
     console.log('the req.query',category)
     if (!category) {
        return sendError(res, { message: "Category query parameter is required" }, 400);
      }
try{
    
    const foodCategory = await Category.find({Categoryname:category});
    console.log('the food category is',foodCategory)

    if(!foodCategory){  
        sendError(res,{message:"false"},400)
    };

    sendSuccess(res,foodCategory,"categorydata fetched successfully",200)
  
}catch(err){
   console.log('the error occur in the addfoodCategory',err.message)
   sendError(res,{message:'internal server error'},500)
}
}

export {
     addfoodCategory,
     foodCategorydata,
     addsubCategoy

}