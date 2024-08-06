import mongoose from "mongoose";
import validator from "validator";

const ApplicationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"],
        minLength:[3,"Name must contain atleast 3 letters!"],
        maxLength:[30,"Name cannot exceed more than 30 letters!"]
       },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        validate:[validator.isEmail,"Please Provide a valid email"],
        unique:true
       },
    coverletter:{
        type:String,
        required:[true,"Please provide a coverletter"],
    },
    phone:{
        type:Number,
        required:[true,"Please provide your phone number"],
    },
    address:{
        type:String,
        required:[true,"Please provide your address!"],
        minLength:[15,"Job location name must contain atleast 15 character!"],
        maxLength:[125,"Job location name cannot exceed 125 character!"],
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }, 
    applicationId:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            required:[true,"Please provide your role"],
            enum:["Job Seeker"]
        }
    },
    employerId:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            required:[true,"Please provide your role"],
            enum:["Employer"]
        }
    },  
});

export const Application=mongoose.model("Application",ApplicationSchema)