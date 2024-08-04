import express from "express";
import { getAllJobs,postJobs } from "../controller/jobController.js";
import isAuthorized from "../middleware/auth.js";

const router=express.Router();

router.get("/getAllJobs",isAuthorized, getAllJobs);
router.post("/postJobs",isAuthorized ,postJobs);

export default router;
