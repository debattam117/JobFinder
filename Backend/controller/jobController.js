import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { ErrorHandler } from "../middleware/error.js"
import { Job } from "../model/jobSchema.js";
import { sendToken } from "../util/jwtToken.js";


//Show all the jobs present
export const getAllJobs=catchAsyncError(async (req,res,next)=>{
    const jobs= await Job.find({expired: false});
    res.status(200).json({
        success:true,
        jobs,
    });

});


//POST job  details in the Data Base
export const postJobs=catchAsyncError(async(req,res,next)=>{
    const{role}=req.user;     //req.user we are getting auth.js i.e isAuthorized i.e we have used in routes and then its coming here as req
    if(role ==="Job Seeker"){
        return next(new ErrorHandler
        ("Job Seeker is not allowed to access this resource!",400)
    )};
    
    const{title,description,company,category,country,city,location,fixedsalary,salaryfrom,salaryto,currency}=req.body;
    
    if(!title||!description||!company||!category||!country||!city||!location||!currency){
        return next(new ErrorHandler
        ("Please Enter full job details!",400)
    )};

    if((!salaryfrom||!salaryto)&&!fixedsalary){
        return next(new ErrorHandler
        ("Please either provide fixed salary or ranged salary!",400)
    )};

    if(salaryfrom && salaryto && fixedsalary){
        return next(new ErrorHandler
        ("Cannot enter fixed salary and ranged salary together!",400)
    )};

    const postedBy= req.user._id; //mongoose.Schema.ObjectId
    //title,description,company,category,country,city,location,fixedsalary,salaryfrom,salaryto,currency this names should be same as you described in the schema
    const job=await Job.create({
        title,
        description,
        company,
        category,
        country,
        city,
        location,
        fixedsalary,
        salaryfrom,
        salaryto,
        currency,
        postedBy
    });
    res.status(200).json({
      success:true,
      message:"Job posted successfully!",
      job
    });

});

//GET  Job details posted by specific user
export const getMyJobs= (async (req,res,next)=>{
    const{role}=req.user;
    if(role ==="Job Seeker"){
        return next(new ErrorHandler
        ("Job Seeker is not allowed to access this resource!",400)
    )};

    const jobs = await Job.find({
        $and: [
            { expired: false },
            { postedBy: req.user._id }
        ]
    });

    res.status(200).json({
        success: true,
        jobs
    });

});


//PUT: Update Job details posted by specific user
export const updateJob= (async (req,res,next)=>{
    const{role}=req.user;
    if(role ==="Job Seeker"){
        return next(new ErrorHandler
        ("Job Seeker is not allowed to access this resource!",400)
    )};

    const{id}=req.params;              //here id is same as we used in routes. router.put("/update/:id",isAuthorized, updateJob);

    let job=await Job.findById(id);

    if(!job){
        return next(new ErrorHandler
        ("Oops Job not found!",404)
    )};

    job = await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    });
    res.status(200).json({
        success:true,
        job,
        message:"Job updated Successfully!"
    });
});

export const deletJobs= (async (req,res,next)=>{

    const{role}=req.user;
    if(role ==="Job Seeker"){
        return next(new ErrorHandler
        ("Job Seeker is not allowed to access this resource!",400)
    )};

    const{id}=req.params;              

    let job=await Job.findById(id);

    if(!job){
        return next(new ErrorHandler
        ("Oops Job not found!",404)
    )};

    await job.deleteOne();

    res.status(200).json({
        success:true,
        message:"Job deleted Successfully!"
    });
});