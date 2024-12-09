import Category from "../../model/Admin/Category.model";
import { sendError, sendSuccess } from "../../../utils/resHandler";
import validateCategoryschema from "../../../utils/categoryvalidationSchema";
const addfoodCategory = async (req,res)=>{

    const {
        error,
        value
    } = validateCategoryschema.validate(req.body);
        
       if(error){
        return sendError(res, { message: error.details[0].message }, 400);
        } // Bad Request       

       const  {
            categoryName,
            categorydetail,
            categoryfilepath,
            pricing
        } = value
    try{
         
        await Category.create(
            {
                categoryName,
                categorydetail,
                categoryfilepath,
                pricing
            }
        )

        sendSuccess(res,)

       
    }catch(err){
        console.log('the error occur in the addfoodCategory',err.message)
    }
}

export {
     addfoodCategory

}