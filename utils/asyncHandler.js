const asyncHandler = (res,data,message="success",statuscode=200)=>{
     res.status(statuscode).json({
        message,
        data
     });
};

const errorMessage = (res,error,statuscode=500)=>{
    res.status(statuscode).json({
         success:false,
          message:error.message || "Internal server Error",
          error
    });
};

export default asyncHandler;