import mongoose  from "mongoose";
const dbName = '/foodApp'
const dbConnection =  () =>{

    mongoose.connect(`/${dbName}`)
    .then(()=>{
        console.log("the database iss successfully connecteed")
    })
    .catch((err)=>{
       console.log('teh error in the database connectionn',err.meesge)
    })
     
};

export default dbConnection;