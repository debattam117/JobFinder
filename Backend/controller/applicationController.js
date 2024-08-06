import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { ErrorHandler } from "../middleware/error.js"
import { Application } from "../model/applicationSchema.js";

export const employerGetAllApplication=catchAsyncError(async (req,res,next)=>{
    const{role}=req.user;     //req.user we are getting auth.js i.e isAuthorized i.e we have used in routes and then its coming here as req
    if(role ==="Job Seeker"){
        return next(new ErrorHandler
        ("Job Seeker is not allowed to access this resource!",400)
    )};
    
    const{_id}=req.user;
    const application= await Application.find({'employerId.user':_id});
    res.status(200).json({
        success:true,
        application,
    });

});


export const jobseekerGetAllApplication=catchAsyncError(async (req,res,next)=>{
    const{role}=req.user;     //req.user we are getting auth.js i.e isAuthorized i.e we have used in routes and then its coming here as req
    if(role ==="Employer"){
        return next(new ErrorHandler
        ("Employer is not allowed to access this resource!",400)
    )};
    
    const{_id}=req.user;
    const application= await Application.find({'applicationId.user':_id});
    res.status(200).json({
        success:true,
        application,
    });
});


export const jobseekerDeleteApplication=catchAsyncError(async (req,res,next)=>{

    const{role}=req.user;
    if(role ==="Employer"){
        return next(new ErrorHandler
        ("Employer is not allowed to access this resource!",400)
    )};

    const{id}=req.params;              

    let app=await Application.findById(id);

    if(!app){
        return next(new ErrorHandler
        ("Oops Application not found!",404)
    )};

    await Application.deleteOne();

    res.status(200).json({
        success:true,
        message:"Application deleted Successfully!"
    });
});

