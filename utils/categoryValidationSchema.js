import Joi from "joi";

const validateCategoryschema = Joi.object({
    Categoryname:Joi.string().required().messages(
        "categoryname is required"
    ),
    categoryItemName:Joi.string().required().messages(
    " categoryItemName are required"
    ),
    description:Joi.string().required().messages(
        "description are must be required"
    ),
    pricing:Joi.array()
    .items(
        Joi.object({
            size:Joi.string().message(
            "categoty sized are required"
            ),
            price:Joi.string().message(
          "category price are required"
            )
        })
    ).required()
    .message(
        "Pricing must be an array of objects.",
    ),
    subcategories:Joi.array()
   
  
});

export default validateCategoryschema;