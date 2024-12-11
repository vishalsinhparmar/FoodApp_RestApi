import { sendError, sendSuccess } from "../../../utils/resHandler";
import Cart from "../../model/Cart/cart.model"; 

const addCartdetail = async (req,res) => {
      const {id} = req.params
      const {informationdata} = req.body;

      try{
         


            const cartdata = await Cart.findByIdAndUpdate(
                 id,
                 {additionalInfo:informationdata},
                 {new:true}
            );

            if(!cartdata){
                return  sendError(res,"something went wrong",400)
            };

    

            sendSuccess(res,"the cart are created a successfully",200);
           
      }catch(err){
        console.log('the error occur in the addCartdetail',err.messsage)
      }
};


export default addCartdetail;