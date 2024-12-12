import { sendError, sendSuccess } from "../../../utils/resHandler.js";
import Cart from "../../model/Cart/cart.model.js";
import CartIteam from "../../model/Cart/cartItem.model.js";

const addCardItem = async (req,res)=>{
    const {subcategoryId,qty,total} = req.body;
      try{
          
        const cartdata = await CartIteam.create({
            subcategoryId,
            qty,
            total
        });

        const pushData = await Cart.findByIdAndUpdate()


           
      }catch(err){
        console.log('the error occur is',err.message)
      }
}

const addCartdetail = async (req,res) => {
      const {subcategoryId,qty,pricing} = req.body;
      console.log('the subcategories is',subcategoryId)
      console.log('the reqbody is a',req.body)

      try{
             const subcategoryDataxist = await Cart.findOne({subcategoryId:subcategoryId})
              if(subcategoryDataxist){
                 subcategoryDataxist.qty+=1;
                 subcategoryDataxist.total+=pricing;

                 await subcategoryDataxist.save();
                 return sendSuccess(res, subcategoryDataxist, "Cart item updated successfully", 200);
            };

            console.log('the subcategoryDataxist',subcategoryDataxist);
                
            
            const cartdata = await Cart.create({
                userId:req.user.sub,
                subcategoryId,
                qty,
                total:pricing,
            });

            if(!cartdata){
                return  sendError(res,"something went wrong",400)
            };


            sendSuccess(res,cartdata,200);
           
      }catch(err){
        console.log('the error occur in the addCartdetail',err.message)
      }
};

const showallCartdata = async (req,res) => {
    

    try{
           const userid = req.user.sub
           const cartDataforuser = await Cart.find({userId:userid}).populate('subcategoryId')
         
           console.log('the cartDataforuser',cartDataforuser)

           if (!cartDataforuser|| cartDataforuser.length === 0) {
            return sendError(res, "No cart data found for this user", 404);
          }
          // const totalprice = await Cart.find(userId)
            
         const subtotalprice =  cartDataforuser.reduce((acc,currentval)=>{
                console.log('the currentval is',currentval);
               return acc + (currentval.total || 0)
          },0);
          console.log('the subtotalprice price',subtotalprice);

          sendSuccess(res,{cartDataforuser,subtotalprice},200);
         
    }catch(err){
      console.log('the error occur in the cartdataforUser',err.message)
    }
};

const cartCategorydelete = async (req,res)=>{
     
}


export {
    addCartdetail,
    showallCartdata,
    cartCategorydelete
};

