import mongoose  from "mongoose";

const dbConnection = async () =>{
   
    try{
        await mongoose.connect(`${process.env.DATABASE_URL}`)
        console.log('the database connected successfully')
    }catch(err){
       console.log('error occur in the connection',err)
    }
 
     
};
// dbConnection()

export default dbConnection;