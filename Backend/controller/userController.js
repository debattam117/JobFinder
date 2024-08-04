import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { ErrorHandler } from "../middleware/error.js"
import { User } from "../model/userSchema.js";
import { sendToken } from "../util/jwtToken.js";

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
     sendToken(user,200,res,"User Register Successfully!");
});


export const login=catchAsyncError(async (req,res,next)=>{
     const {email,password,role}=req.body;

     if(!email||!password||!role){
          return next(new ErrorHandler("Please provide email password and role",400));
     }
     
     const user= await User.findOne({email}).select("+password");//Finding user in the mongo db using email and password

     if(!user)
     {
       return next(new ErrorHandler("Invalid email or password!",400));
     }

     const isPasswordMatched = await user.comparePassword(password);

     if(!isPasswordMatched)
     {
       return next(new ErrorHandler("Invalid email or password!",400));  
     }

     if(user.role !== role){
          return next(new ErrorHandler("User with this role not found!",400));
     }

     sendToken(user,200,res,"User login successfully!");

});


export const logout=catchAsyncError(async (req,res,next)=>{

     res.status(201).cookie("token","",{
          httpOnly:true,
          expires:new Date(
               Date.now()+process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
          ),

     }).json({
          success:true,
          message: "User logged out successfully!"
     })
     


});