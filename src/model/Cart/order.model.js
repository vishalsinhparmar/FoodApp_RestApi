
import mongoose from "mongoose";

const Orderschema = new mongoose.Schema({
         userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
         },
         items:[
           
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'CartIteam'
            }

            //  {
            //    subcategoryId:{
            //     type:mongoose.Schema.Types.ObjectId,
            //     ref:"subcategory"
            //    },
            //    qty:{
            //     type:String,
            //     require:true
            //    },
            //    total:{
            //     type:String,
            //     require:true
            //    }
            //  }
            
         ],
         grandTotal:{
            type:Number,
            require:true
         },
         deliveryAddress:{
            type:String,
            require:true
         },
         paymentStatus:{
            type:String,
            require:true
         }
},{timestamps:true});

const Order = mongoose.model('Order',Orderschema);

export default Order;