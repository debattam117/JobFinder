import express from "express";
import {employerGetAllApplication,jobseekerGetAllApplication,jobseekerDeleteApplication} from "../controller/applicationController.js"
import isAuthorized from "../middleware/auth.js";

const router=express.Router();
router.get("/employerGetAllApplication", isAuthorized, employerGetAllApplication);
router.get("/jobseekerGetAllApplication", isAuthorized, jobseekerGetAllApplication);
router.delete("/jobseekerDeleteApplication/:id", isAuthorized, jobseekerDeleteApplication);

export default router;
