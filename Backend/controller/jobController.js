import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { ErrorHandler } from "../middleware/error.js"
import { Job } from "../model/jobSchema.js";
import { sendToken } from "../util/jwtToken.js";

export const getAllJobs=catchAsyncError(async (req,res,next)=>{
    const jobs= await Job.find({expired: flase});
    res.status(200).json({
        success:true,
        jobs,
    })

});

export const postJobs=catchAsyncError(async(req,res,next)=>{
    const{role}=req.user;
    if(role ==="Job Seeker"){
        return next(new ErrorHandler
        ("Job Seeker is not allowed to access this resource!",400)
    )};
    
    const{title,description,company,category,country,city,location,fixedsalary,salaryfrom,salaryto,currency}=req.body;
    if(!title||!description||!company||!category||!country||!city||!location||!fixedsalary||!salaryfrom||!salaryto||!currency){
        return next(new ErrorHandler
        ("Please Enter full job details!",400)
    )};
});