import Category from "../../model/Admin/Category.model.js";
import { sendError, sendSuccess } from "../../../utils/resHandler.js";
import CategoryItem from "../../model/Admin/categoryItem.model.js";

const foodCategory = async (req,res) =>{
          
    const { category } = req.body
      console.log('the category is',req.body)
      if(!category) return sendError(res,'the body is not found',401);

      try{
         const existCategory = await Category.findOne({Categoryname:category});
         console.log('category of exists',existCategory);
         if(existCategory){
             return sendError(res,"category is allready exists",409)
         };

         const newcategory = await Category.create({
            Categoryname:category
         });
         console.log('newcategory',newcategory)
         sendSuccess(res,"category is created successfully",201);
      }catch(err){
         console.log('error occur in the categoryAdd',err.message)
      }
};

const foodcategorydatashow = async (req,res)=>{

try{
   
   const foodCategory = await Category.find({},{Categoryname:1});
   console.log('the food categoryItem is',foodCategory)

   if(!foodCategory){  
       sendError(res,{message:"false"},400)
   };

   sendSuccess(res,foodCategory,"foocategoryItemdata fetched successfully",200)
 
}catch(err){
  console.log('the error occur in the addfoodCategoryItem',err.message)
  sendError(res,{message:'internal server error'},500)
}
}

const foodCategoryitemDelete = async (req,res)=>{
    const {category} = req.params;
    console.log('foodcategoryitemId',category);

    if(!category){
      sendError(res,"foodcategoryItem not seen",404)
    }

    try{
        const foodcategorItemyDelete = await CategoryItem.findByIdAndDelete(category);
        console.log("foocategoryItemDelete",foodcategorItemyDelete);

        if(!foodcategorItemyDelete){
          return sendError(res,"invalid request",401)
        }

         sendSuccess(res,"foodcategoryItem delete successfully",201)
        
    }catch(err){
      console.log('error in the foodcategoryitemdelete',err.message)
    }
}


export {
    foodCategory,
    foodcategorydatashow,
    foodCategoryitemDelete
}