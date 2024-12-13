import path from "path";
import { sendError, sendSuccess } from "../../../utils/resHandler.js";
import Cart from "../../model/Cart/cart.model.js";
import CartIteam from "../../model/Cart/cartItem.model.js";

const addCardItem = async (req,res)=>{
    const {subcategoryId,qty,total} = req.body;
    console.log('req.body',req.body)
    const userId = req.user.sub
      try{
         
         
        const cartdata = await Cart.findOne({userId}).populate('Iteam');
        
        console.log('the cart is',cartdata)
       if(!cartdata){
        
        let cartItemcreate = await CartIteam.create({
            subcategoryId,
            qty,
            total
        });
        console.log("the cartItemcreate",cartItemcreate)
 
        const cart =  await Cart.create({
          userId,
          Iteam:[cartItemcreate._id],
          subtotal:cartItemcreate.total
        });
        console.log('the cart is',cart)
        sendSuccess(res,"the cart is created successfully",201)
      } 

       const existingCartIteam = cartdata.Iteam.find(item => item.subcategoryId.toString() === subcategoryId);
       console.log('the existingCartIteam',existingCartIteam);

       if(existingCartIteam){
          existingCartIteam.qty+=qty,
          existingCartIteam.total+=total
          cartdata.subtotal+=total
         await existingCartIteam.save();
         await cartdata.save();

         sendSuccess(res,existingCartIteam,"the cartIteam added successfully",201)
       }
       
       const newCartIteam = await CartIteam.create({
           subcategoryId,
           qty,
           total
       });
      // for pushing this newCartIteam
        console.log('the newCartIteam',newCartIteam)
       cartdata.Iteam.push(newCartIteam._id)
       cartdata.subtotal+=total
       await cartdata.save();
       return sendSuccess(res, cartdata, 200);

           
      }catch(err){
        console.log('the error occur is',err.message)
      }
}



const showallCartdata = async (req,res) => {
    

    try{
           const userid = req.user.sub
           const cartDataforuser = await Cart.find({userId:userid}).populate({
              path:'Iteam',
              populate:{
                path:'subcategoryId',
                select:'subCategoryname image'
              }
           })
         
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
        const {deleteId} = req.params;
        console.log('deleteID is',deleteId)
        try{
            const deleteData = await CartIteam.findByIdAndDelete(deleteId);
            console.log('the deleteData is',deleteData);

            if(!deleteData){
              return sendError(res,"item is not found",401)
            }
            sendSuccess(res,"item is deleted successfull",200);
        }catch(err){
             console.log('the error occur in the cartCategorydelete',err.message)
             sendError(res, "Internal server error", 500);
        }
}


export {
    
    showallCartdata,
    cartCategorydelete,
    addCardItem
};

