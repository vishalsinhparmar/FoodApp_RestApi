import Category from "../../model/Admin/Category.model.js";
import Subcategory from "../../model/Admin/subCategory.model.js";
import { sendError, sendSuccess } from "../../../utils/resHandler.js";

const addsubCategoy = async (req, res) => {
  const { subCategoryname, categoryId } = req.body;
  console.log('the subcategories is ', subCategoryname)
  console.log("the file path is", req.files)
  console.log("categoryId", categoryId)
  // if(!req.file.path) return sendError(res,{message:"false"},400)

  try {
    const categoryfile = req.files.image[0]?.path;
    const coverimagefile = req.files.coverimage[0]?.path;

    const subcategories = await Subcategory.create({
      coverimage: categoryfile || "",
      image: coverimagefile,
      subCategoryname,
    })

    const updateCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        $push: { subcategories: subcategories._id }
      },

      { new: true }
    );



    console.log("the pushing item is", updateCategory)

    if (!subcategories) {
      return sendError(res, { message: "false" }, 400)
    };

    sendSuccess(res, subcategories, "subcategorydata created successfully", 201)

  } catch (err) {
    console.log('the error occur in the subfoodCategory', err.message)
  }
};

const subfoodCategorydata = async (req, res) => {
  const { category } = req.params;
  console.log('subcategory is', category)
  if (!category) {
    return sendError(res, { message: "subCategory query parameter is required" }, 400);

  }

  try {

    const subfoodCategory = await Category.findById(category, { subcategories: 1 }).populate('subcategories');
    console.log('the food category is', subfoodCategory)

    //    const subCategory = subfoodCategory.flatMap(category => category.subcategories);

    if (!subfoodCategory || subfoodCategory.length === 0) {
      return sendError(res, { message: "false" }, 400)
    };

    sendSuccess(res, subfoodCategory, "subcategorydata fetched successfully", 200)

  } catch (err) {
    console.log('the error occur in the addfoodCategory', err.message)
    sendError(res, { message: 'internal server error' }, 500)
  }
}

const subCategorydelete = async (req, res) => {
  const { category } = req.params;
  console.log('subcategoryId', category);

  if (!category) {
    return sendError(res, "subcategory not seen", 404)
  }

  try {
    const subcategoryDelete = await Subcategory.findByIdAndDelete(category);
    console.log("subcategoryDelete", subcategoryDelete);

    if (!subcategoryDelete) {
      return sendError(res, "invalid request", 401)
    }

    sendSuccess(res, "subcategory delete successfully", 201)

  } catch (err) {
    console.log('error in the subcategorydelete', err.message)
  }
}

const updatesubCategorybyId = async (req, res) => {

  const { id } = req.params;
  const { subCategoryname } = req.body;

  console.log('req.body', req.body)

  if (!id && !subCategoryname) {
    return sendError(res, "updata subcategory is not valid credentials", 401)
  }

  try {
    const subcategory = await Subcategory.findById(id);

    if (!subcategory) {
      return sendError(res, "subcategory are not found", 404)
    }
    console.log("req.files", req.files)
    const categoryfile = req.files?.image?.[0]?.path || subcategory.image;
    const coverimagefile = req.files?.coverimage?.[0]?.path || subcategory.coverimage;

    const updateField = {
      coverimage: categoryfile,
      image: coverimagefile,
      subCategoryname,
    }
    const updatesubCategory = await Subcategory.findByIdAndUpdate(id,

      updateField,

      { new: true }
    );

    if (!updatesubCategory) {
      return sendError(res, "Failed to update a subcategory", 404)
    }

    console.log('updatesubCategory', updatesubCategory);

    sendSuccess(res, updatesubCategory, "subCategory updated successfully", 201);

  } catch (err) {
    console.log('error occur in updateCategorybyId', err.message)
  }

}

const subfoodCategorybyId = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return sendError(res, "subcategory is not valid credentials", 401)
  }

  try {
    const subcategorydataByid = await Subcategory.findById(id);
    if (!subcategorydataByid) {
      return sendError(res, "invalid request credential are not metched", 402)
    }
    console.log('subcategorybyId', subcategorydataByid)
    sendSuccess(res, subcategorydataByid, "subcategory are fetched by item successfully", 200)
  } catch (err) {
    console.log('error occur in the subcategorybyId', err.message)
  }

}

export {
  addsubCategoy,
  subfoodCategorydata,
  subCategorydelete,
  updatesubCategorybyId,
  subfoodCategorybyId
}