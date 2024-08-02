import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema=new mongoose.Schema({
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
    phone:{
        type:Number,
        required:[true,"Please provide your phone number"],
       },
    password:{
        type:String,
        required:[true,"Please provide your phone number"],
        minLength:[8,"Password must contain atleast 8 Characters!"],
        maxLength:[30,"Password cannot exceed more than 30 Characters!"],
        select:false                                                             // password will not show during a get request 
       },
    role:{
        type:String,
        required:[true,"Please provide your role"],
        enum:["Job Seeker","Employer"]
       },
    createdDate:{
        type:Date,
        default:Date.now
    },
})


//HASHING THE PASSWORD
UserSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
});

//COMPARING THE PASSWORD
UserSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

//GENERATING A JWT TOKEN FOR AUTHORISATION
UserSchema.methods.getJWTToken= function()
{
    return jwt.sign({id:this.id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};



export const User =mongoose.model("User",UserSchema);