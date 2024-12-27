const sendSuccess = (res,data,message="success",statuscode=200)=>{
    res.status(statuscode).json({
      success:true,
       message,
       data
    });
};

const sendError = (res,data=null,message="Failed",statuscode=500)=>{
   res.status(statuscode).json({
         success:false,
          message,
          data,
         
   });
};

export {sendSuccess,sendError};
