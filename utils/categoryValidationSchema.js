import Joi from "joi";

const validateCategoryschema = Joi.object({
    categoryName:Joi.string().min(3).max(50).required(),
    categorydetail:Joi.string().min(3).required(),
    categoryfilepath:Joi.string().uri().required(),
    pricing:Joi.number().positive().required()
})

export default validateCategoryschema;