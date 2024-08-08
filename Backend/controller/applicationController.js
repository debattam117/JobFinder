import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { ErrorHandler } from "../middleware/error.js"
import { Application } from "../model/applicationSchema.js";
import { Job } from "../model/jobSchema.js";
import cloudinary from "cloudinary";


//GET: Employer able to fetch all the application submitted to his/her job queue
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

//GET: Job seeker able to fetch his all submitted application
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

//DELETE: Job seeker can delete his own application
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


export const postApplication=catchAsyncError(async(req,res,next)=>{
    const{role}=req.user;
    
    if(role ==="Employer"){
        return next(new ErrorHandler
        ("Employer is not allowed to access this resource!",400)
    )};

    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler
            ("Resume file requires!",400)
        )
    };

    const{resume}=req.files;

    const allowedFormats=['image/png','image/jpg','image/webp'];

    if(!allowedFormats.includes(resume.mimetype)){
        return next(new ErrorHandler
            ("Invalid file type. Please upload your resume in a PNG, JPG OR WEBP Format!",400)
        )
    };

    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    );

    if(!cloudinaryResponse||cloudinaryResponse.error){
        console.error(
            "Cloudinary Error:",cloudinaryResponse.error||"Unknown cloudinary error"
        );
        return next(new ErrorHandler
            ("Failed to upload resume!",400)
        );
    }
    const{name,email,coverletter,phone,address,jobId}=req.body;
    
    const applicationId={
        user: req.user._id,
        role: "Job Seeker"
    }

    if(!jobId){
        return next(new ErrorHandler("Job not found!",404)
    )};

    const jobDetails=await Job.findById(jobId);//need to check 

    if(!jobDetails){
        return next(new ErrorHandler("Job not found!",404)
    )};

    const employerId={
        user:jobDetails.postedBy,
        role:"Employer"
    }
    
    if(!name || !email || !coverletter || !phone || !address || !applicationId || !employerId || !resume){
        return next(new ErrorHandler("Please fill all the fields!",404)
    )};

    const application = await Application.create({
        name,
        email,
        coverletter, 
        phone ,
        address ,
        applicationId,
        employerId ,
        resume : {
            public_id:cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });

    res.status(200).json({
        success:true,
        message:"Profile Sent Successfull!",
        application
    });


   
});
