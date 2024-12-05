const verifyAuthenticateUser = async (req,res,next)=>{
     try{
          await User.verify(err,'secret',(user)=>{
             if(err) return;
             req.user = user;
             next();
          })
     }catch(err){
        console.log('the error message is',err)
     }
} 

export default verifyAuthenticateUser;