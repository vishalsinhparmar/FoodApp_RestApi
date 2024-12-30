import { sendError, sendSuccess } from "../../../utils/resHandler.js";
import CartIteam from "../../model/Cart/cartItem.model.js";

const addCartadditionalInfo = async (req,res) => {
      const {id} = req.params;
      console.log('the id in addCartadditionalInfo',id);
      const {detailinfo} = req.body;
      console.log('the informationdata',detailinfo)

      try{
          
            const cartItem = await CartIteam.findById(id);
            if(!cartItem){
                return sendError(res,"Cart item is not found",404)
            }
           
            const cartdata = await CartIteam.findByIdAndUpdate(
                 id,
                 {additionalInfo:{detailinfo}},
                 {new:true}
            );
            console.log('the additionalInfo',cartdata)

            if(!cartdata){
                return  sendError(res,"Faild update a cart Item",400)
            };

    

            sendSuccess(res,cartdata,200);
           
      }catch(err){
        console.log('the error occur in the addCartdetail',err.messsage)
      }
};


export default addCartadditionalInfo;