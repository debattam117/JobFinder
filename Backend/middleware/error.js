class ErrorHandler extends Error{

    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}


export const errorMiddleware=(err,req,res,next)=>{
   err.message=err.message ||"Internal Server Error";
   err.statusCode=err.statusCode ||500;

   if(err.name==="CaseError"){
     const message=`Resource not found. Invalid ${err.path}`
     err=new ErrorHandler(message,400);
   }

   if(err.code===11000){
    const message=`Duplicate ${object.keys(err.keyValue)} Entered`
    err=new ErrorHandler(message,400);
  }

  if(err.name==="JsonWebTokenError"){
    const message=`Json Web token is invalid. Try again`
    err=new ErrorHandler(message,400);
  }

  if(err.name==="TokenExpiredError"){
    const message=`Json Web token is expired. Try again`
    err=new ErrorHandler(message,400);
  }

  return res.status(statusCode).json({
    success:false,
    message:err.message,
  });

}

export { ErrorHandler };  //Exporting error handler class . Not a function its a class
