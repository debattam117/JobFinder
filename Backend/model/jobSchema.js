import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from "../model/userSchema.js"

const JobSchema=new mongoose.Schema({
    title: {
        type: String,
        required:[true,"Please provide job title"],
        minLength:[3,"Job title must contain atleast 3 character!"],
        maxLength:[50,"Job title cannot exceed 50 character!"],

      },
      description: {
        type: String,
        required:[true,"Please provide job description!"],
        minLength:[3,"Job description must contain atleast 3 character!"],
        maxLength:[350,"Job description cannot exceed 350 character!"],
      },
      company: {
        type: String,
        required: true,
        minLength:[5,"Company name must contain atleast 5 character!"],
        maxLength:[55,"Company name cannot exceed 55 character!"],
      },
      category: {
        type: String,
        required: [true,"Please enter a job category!"],
        minLength:[2,"Job category must contain atleast 2 character!"],
        maxLength:[25,"Job category cannot exceed 25 character!"],
      },
      country: {
        type: String,
        required: [true,"Please enter a job Country!"],
        minLength:[2,"Job country name must contain atleast 2 character!"],
        maxLength:[25,"Job country name cannot exceed 25 character!"],
      },
      city: {
        type: String,
        required: [true,"Please enter a job City!"],
        minLength:[3,"Job city name must contain atleast 3 character!"],
        maxLength:[25,"Job city name cannot exceed 25 character!"],
      },
      location: {
        type: String,
        required: [true,"Please provide exact job location!"],
        minLength:[15,"Job location name must contain atleast 15 character!"],
        maxLength:[125,"Job location name cannot exceed 125 character!"],
      },
      fixedsalary: {
        type: Number,
        required: false,
        minLength:[4,"salary must contain atleast 4 digit!"],
        maxLength:[9,"salary cannot exceed 9 digit!"],
      },
      salaryfrom: {
        type: Number,
        required: false,
        minLength:[4,"salaryform must contain atleast 4 digit!"],
        maxLength:[9,"salaryform cannot exceed 9 digit!"],
      },
      salaryto: {
        type: Number,
        required: false,
        minLength:[4,"salaryto must contain atleast 4 digit!"],
        maxLength:[9,"salaryto cannot exceed 9 digit!"],
      },
      currency: {
        type: String,
        required: true,
        enum:["Dollar","Rupee","Euro"],
      },
      expired:{
        type: Boolean,
        default: false

      },
      postedDate: {
        type: Date,
        default: Date.now,
      },
      postedby:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
      }
});

export const Job =mongoose.model("Job",JobSchema);