import { sendError, sendSuccess } from "../../../utils/resHandler.js";
import AdditonalInfo from "../../model/Cart/additonalInfo.model.js";
import CartIteam from "../../model/Cart/cartItem.model.js";

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
            const cartIfodata = await CartIteam.findById(id);
            console.log('the cartIfodata',cartIfodata); 
            const cartdata = await CartIteam.findByIdAndUpdate(
                 id,
                 {additionalInfo:{detailinfo:additionalInfo.detailinfo}},
                 {new:true}
            );
            console.log('the additionalInfo',cartdata)

            if(!cartdata){
                return  sendError(res,"something went wrong",400)
            };

    

            sendSuccess(res,cartdata,200);
           
      }catch(err){
        console.log('the error occur in the addCartdetail',err.messsage)
      }
};


export default addCartadditionalInfo;