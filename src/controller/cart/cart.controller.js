import { sendError, sendSuccess } from "../../../utils/resHandler";
import Cart from "../../model/Cart/cart.model";

const addCartdetail = async (req,res) => {
      const {userId,subcategoryId,qty,pricing} = req.body;

      try{
             const subcategoryDataxist = await Cart.findOne({subcategoryid:subcategoryId})
            if(subcategoryDataxist){
                 subcategoryDataxist.qty+=1;
                 subcategoryDataxist.pricing*=2;
            };


            const cartdata = await Cart({
                userId,
                subcategoryId,
                qty,
                pricing,
            });

            if(!cartdata){
                return  sendError(res,"something went wrong",400)
            };

            // const totalprice = await Cart.find(userId)
              
        //    const subtotalprice =  totalprice.reduce((acc,currentval)=>{
        //         const pricing  =  currentval.map((item)=>{
        //               return item.pricing
        //          })
        //          return acc+pricing
        //     },0);

            sendSuccess(res,"the cart are created a successfully",200);
           
      }catch(err){
        console.log('the error occur in the addCartdetail',err.messsage)
      }
};


export default addCartdetail;