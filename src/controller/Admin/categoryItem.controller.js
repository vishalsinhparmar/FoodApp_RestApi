import { sendError, sendSuccess } from "../../../utils/resHandler.js";
import Category from "../../model/Admin/Category.model.js";
import CategoryItem from "../../model/Admin/categoryItem.model.js";

const addfoodCategoryItem = async (req, res) => {
  console.log('req.file', req.file.path)
  if (!req.file.path) return sendError(res, { message: "false" }, 400)


  // Bad Request       

  const { categoryId, categoryItemName, description, pricing } = req.body;
  console.log('the subcategories', categoryId)
  try {
    const categoryfilepath = req.file.path;

    console.log('the originalfilepath', categoryfilepath)
    const category = await Category.findById(categoryId);
    console.log('category is', category)
    console.log('categorydata stage are comming')

    if (!category) return sendError(res, "category are not found", 404);

    console.log('categorydata stage are comming')
    const CategoryItemdata = await CategoryItem.create(
      {

        categoryItemName,
        description,
        image:categoryfilepath,
        pricing: JSON.parse(pricing)
      }
    )

    category.categoryIteam.push(CategoryItemdata._id);
    await category.save()

    sendSuccess(res, CategoryItemdata, 'category created successfully', 201)


  } catch (err) {
    console.log('the error occur in the addfoodCategory', err.message)
  }
}

const foodCategoryItemdata = async (req, res) => {
  const { category } = req.params;
  console.log('the query is', req.params)
  console.log('the req.query', category)
  if (!category) {
    return sendError(res, { message: "Category query parameter is required" }, 400);
  }
  try {

    const foodCategory = await Category.findById(category).populate("categoryIteam");
    console.log('the food category is', foodCategory)

    if (!foodCategory) {
      return sendError(res, { message: "false" }, 400)
    };

    sendSuccess(res, foodCategory, "categorydata fetched successfully", 200)

  } catch (err) {
    console.log('the error occur in the addfoodCategory', err.message)
    sendError(res, { message: 'internal server error' }, 500)
  }
}

const foodCategorydelete = async (req, res) => {
  const { category } = req.params;
  console.log('categoryId', category);

  if (!category) {
    sendError(res, "category not seen", 404)
  }

  try {
    const categoryDelete = await Category.findByIdAndDelete(category);
    console.log("categoryDelete", categoryDelete);

    if (!categoryDelete) {
      return sendError(res, "invalid request", 401)
    }

    sendSuccess(res, "category delete successfully", 201)

  } catch (err) {
    console.log('error in the foodcategorydelete', err.message)
  }
}

const updateCategoryitembyId = async (req,res) => {
  const { id } = req.params;
  console.log("id for the categoaryItemupdate",id);
  const { categoryItemName,description,pricing} = req.body;
  console.log('req.body for the categoryItem',req.body);

  if (!id && !categoryItemName && !description && !pricing) {
    return sendError(res, "updata categoryIteam id is not valid", 401)
  }

  const categoryfilepath = req.file.path; 
  console.log(categoryfilepath)
  if(!categoryfilepath){
     sendError(res,"categoryItem file path are not found",401)
  }

  try {

    const updateCategoryItem = await CategoryItem.findByIdAndUpdate(id, {
      categoryItemName,
      description,
      image:categoryfilepath,
      pricing:JSON.parse(pricing)

    },
      { new: true }
    );

    console.log('updateCategoryItem', updateCategoryItem);

    if (!updateCategoryItem) {
      return sendError(res, "updateCategoryitem is not valid credentials", 401)
    };

    sendSuccess(res, "categoryItem is updated successfully", 201);

  } catch (err) {
    console.log('error occur in updateCategoryitembyId', err.message)
  }
}

export {
  addfoodCategoryItem,
  foodCategoryItemdata,
  foodCategorydelete,
  updateCategoryitembyId
}