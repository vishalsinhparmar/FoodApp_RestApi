import Category from "../../model/Admin/Category.model.js";
import { sendError, sendSuccess } from "../../../utils/resHandler.js";
import CategoryItem from "../../model/Admin/categoryItem.model.js";

// add food categoy using a req.body
const AddfoodCategory = async (req,res) =>{
          
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
      return sendError(res,{message:"false"},400)
   };

   sendSuccess(res,foodCategory,"foocategoryItemdata fetched successfully",200)
 
}catch(err){
  console.log('the error occur in the addfoodCategoryItem',err.message)
  sendError(res,{message:'internal server error'},500)
}
}

// fetch all the category data are found
const categorydata = async (req,res)=>{

  try{    
     const foodCategory = await Category.find().populate("categoryIteam");
     console.log('the food category is',foodCategory)
  
     if(!foodCategory){  
        return sendError(res,{message:"false"},400)
     };
  
     sendSuccess(res,foodCategory,"categorydata fetched successfully",200)
   
  }catch(err){
    console.log('the error occur in the addfoodCategoryItem',err.message)
    sendError(res,{message:'internal server error'},500)
  }
  }

// category delete by the perticular id of the category
const foodCategoryitemDelete = async (req,res)=>{
    const {category} = req.params;
    console.log('foodcategoryitemId',category);

    if(!category){
     return sendError(res,"foodcategoryItem not seen",404)
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

// update categorybyId have by the id of the category with patch data
const updateCategorybyId = async (req,res)=>{
   const {id} = req.params;
   console.log('id is',id);
   const {category} = req.body;
   console.log('res.body',req.body)
   if(!id && !category){
    return sendError(res,"updata category id is not valid",401)
   }
   try{
      const updateCategory = await Category.findByIdAndUpdate(id,{
        Categoryname:category
      },
      {new:true}
    );

    console.log('updateCategory',updateCategory);

    if(!updateCategory){
     return sendError(res,"updateCategory is not valid credentials",401)
    };
    
    sendSuccess(res,"category updated successfully",201);

   }catch(err){
    console.log('error occur in updateCategorybyId',err.message)
   }
}
// category data are fectched individual id
const categorybyId = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return sendError(res, "subcategory is not valid credentials", 401)
  }

  try {
    const categoryByid = await Category.findById(id);
    if (!categoryByid) {
      return sendError(res, "invalid request credential are not metched", 402)
    }
    console.log('categoryByid', categoryByid)
    sendSuccess(res, categoryByid, "categoryByid are fetched by item successfully", 200)
  } catch (err) {
    console.log('error occur in the categoryByid', err.message)
  }

}


export {
    categorydata,
    AddfoodCategory,
    foodcategorydatashow,
    foodCategoryitemDelete,
    updateCategorybyId,
    categorybyId
}