import { sendError, sendSuccess } from "../../../utils/resHandler.js";
import AdditonalInfo from "../../model/Cart/additonalInfo.model.js";
import Cart from "../../model/Cart/cart.model.js"; 

const addCartadditionalInfo = async (req,res) => {
      const {id} = req.params;
      console.log('the id in addCartadditionalInfo',id);
      const {detailinfo} = req.body;
      console.log('the informationdata',detailinfo)

      try{
            const additionalInfo = await AdditonalInfo.create({
               detailinfo
            });

            console.log('the additionalInfo',additionalInfo);
         
            const cartdata = await Cart.findByIdAndUpdate(
                 id,
                 {additionalInfo:additionalInfo.detailinfo},
                 {new:true}
            );

            if(!cartdata){
                return  sendError(res,"something went wrong",400)
            };

    

            sendSuccess(res,cartdata,200);
           
      }catch(err){
        console.log('the error occur in the addCartdetail',err.messsage)
      }
};


export default addCartadditionalInfo;