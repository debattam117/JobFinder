import express from "express";
import {employerGetAllApplication,jobseekerGetAllApplication,jobseekerDeleteApplication,postApplication} from "../controller/applicationController.js"
import isAuthorized from "../middleware/auth.js";

const router=express.Router();
router.get("/employer/GetAll", isAuthorized, employerGetAllApplication);
router.get("/jobseeker/GetAll", isAuthorized, jobseekerGetAllApplication);
router.delete("/jobseekerDeleteApplication/:id", isAuthorized, jobseekerDeleteApplication);
router.post("/postApplication", isAuthorized, postApplication);

export default router;
