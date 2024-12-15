const sendSuccess = (res,data,message="success",statuscode=200)=>{
    res.status(statuscode).json({
      success:true,
       message,
       data
    });
};

const sendError = (res,error,    statuscode=500)=>{
   res.status(statuscode).json({
         success:false,
         error,
          message:error.message || "Internal server Error",
         
   });
};

export {sendSuccess,sendError};
