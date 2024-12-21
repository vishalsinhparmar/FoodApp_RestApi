// import Category from "../../model/Admin/Category.model.js";
// import { sendError, sendSuccess } from "../../../utils/resHandler.js";
// import Subcaegory from "../../model/Admin/subCategory.model.js";
// import CategoryItem from "../../model/Admin/categoryItem.model.js";
// // import validateCategoryschema from "../../../utils/categoryvalidationSchema.js";

// // foodcategory
// const foodCategory = async (req,res) =>{
          
//         const { category } = req.body
//           console.log('the category is',req.body)
//           if(!category) return sendError(res,'the body is not found',401);

//           try{
//              const existCaegory = await Category.findOne({Categoryname:category});
//              console.log('category of exists',existCaegory);
//              if(existCaegory){
//                  return sendError(res,"category is allready exists",409)
//              };

//              const newcategory = await Category.create({
//                 Categoryname:category
//              });
//              console.log('newcategory',newcategory)
//              sendSuccess(res,"category is created successfully",201);
//           }catch(err){
//              console.log('error occur in the categoryAdd',err.message)
//           }
// }
// // foodcategory
// const addfoodCategoryItem = async (req,res)=>{
//      console.log('req.file',req.file.path)
//     if(!req.file.path) return sendError(res,{message:"false"},400)

    
//    // Bad Request       
    
//     const  { categoryId,categoryItemName,description, pricing} = req.body;
//          console.log('the subcategories',categoryId)
//     try{
//         const categoryfilepath = req.file.path;

//         console.log('the originalfilepath',categoryfilepath)
//         const category = await Category.findById(categoryId);
//         console.log('category is',category)
//         console.log('categorydata stage are comming')

//         if(!category) return sendError(res,"category are not found",404);
         
//         console.log('categorydata stage are comming')
//        const CategoryItemdata =  await CategoryItem.create(
//             {
                
//                 categoryItemName,
//                 description,
//                 image:categoryfilepath,
//                 pricing:JSON.parse(pricing)
//             }
//         )

//         category.categoryIteam.push(CategoryItemdata._id);
//         await category.save()

//         sendSuccess(res,CategoryItemdata,'category created successfully',201)

       
//     }catch(err){
//         console.log('the error occur in the addfoodCategory',err.message)
//     }
// }

// const addsubCategoy = async (req,res)=>{
//     const {subCategoryname,categoryId} = req.body;
//     console.log('the subcategories is ',subCategoryname)
//     console.log("the file path is",req.files)
//     // if(!req.file.path) return sendError(res,{message:"false"},400)

// try{
//     const categoryfile = req.files.image[0]?.path;
//     const coverimagefile = req.files.coverimage[0]?.path;

//     const subcategories = await Subcaegory.create({
//         coverimage:categoryfile,
//         image:coverimagefile,
//         subCategoryname,
//     })

//     const updateCategory = await Category.findByIdAndUpdate(
//         categoryId,
//         {
//           $push:{subcategories:subcategories._id}        
//         },

//           {new:true}
//     );

    

//     console.log("the pushing item is",updateCategory)

//    if(!subcategories){
//        sendError(res,{message:"false"},400)
//    };

//    sendSuccess(res,subcategories,"subcategorydata created successfully",201)
 
// }catch(err){
//   console.log('the error occur in the subfoodCategory',err.message)
// }
// }

// const foodcategorydatashow = async (req,res)=>{
//     // const {category} = req.params;
//     // console.log('the query is',req.query)
//     // console.log('the req.query',category)
//     // if (!category) {
//     //    return sendError(res, { message: "Category query parameter is required" }, 400);
//     //  }
// try{
   
//    const foodCategory = await Category.find({},{Categoryname:1});
//    console.log('the food category is',foodCategory)

//    if(!foodCategory){  
//        sendError(res,{message:"false"},400)
//    };

//    sendSuccess(res,foodCategory,"categorydata fetched successfully",200)
 
// }catch(err){
//   console.log('the error occur in the addfoodCategory',err.message)
//   sendError(res,{message:'internal server error'},500)
// }
// }

// const foodCategoryItemdata = async (req,res)=>{
//      const {category} = req.params;
//      console.log('the query is',req.params)
//      console.log('the req.query',category)
//      if (!category) {
//         return sendError(res, { message: "Category query parameter is required" }, 400);
//       }
// try{
    
//     const foodCategory = await Category.findById(category).populate("categoryIteam");
//     console.log('the food category is',foodCategory)

//     if(!foodCategory){  
//         sendError(res,{message:"false"},400)
//     };

//     sendSuccess(res,foodCategory,"categorydata fetched successfully",200)
  
// }catch(err){
//    console.log('the error occur in the addfoodCategory',err.message)
//    sendError(res,{message:'internal server error'},500)
// }
// }


// const subfoodCategorydata = async (req,res)=>{
//     const {category} = req.params;
//     console.log('category is',category)
//     if(!category){
//         return sendError(res, { message: "Category query parameter is required" }, 400);
         
//     }

// try{
   
//    const subfoodCategory = await Category.findById(category,{subcategories:1}).populate('subcategories');
//    console.log('the food category is',subfoodCategory)

// //    const subCategory = subfoodCategory.flatMap(category => category.subcategories);
   
//    if(!subfoodCategory || subfoodCategory.length === 0){  
//        sendError(res,{message:"false"},400)
//    };

//    sendSuccess(res,subfoodCategory,"categorydata fetched successfully",200)
 
// }catch(err){
//   console.log('the error occur in the addfoodCategory',err.message)
//   sendError(res,{message:'internal server error'},500)
// }
// }

// export {
//      foodCategory,
//      addfoodCategoryItem,
//      foodCategoryItemdata,
//      addsubCategoy,
//      subfoodCategorydata,
//      foodcategorydatashow

// }