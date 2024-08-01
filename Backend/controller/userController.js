import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { ErrorHandler } from "../middleware/error.js"
import { User } from "../model/userSchema.js";

export const register=catchAsyncError(async (req,res,next)=>{
     const {name,email,phone,role,password}=req.body;

     if(!name||!email||!phone||!role||!password){
          return next(new ErrorHandler("Please fill all the details given"));
     }

     const isEmail= await User.findOne({email});
     if(isEmail){
          return next(new ErrorHandler("Please enter a new mail!"));
     }

     const user=await User.create({
          name,
          email,
          phone,
          role,
          password
     });
     res.status(200).json({
          success:true,
          message:"User Registered!",
          user,
     })
});