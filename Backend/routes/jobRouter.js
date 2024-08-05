import express from "express";
import { getAllJobs,postJobs,getMyJobs,updateJob,deletJobs } from "../controller/jobController.js";
import isAuthorized from "../middleware/auth.js";

const router=express.Router();

router.get("/getAllJobs", getAllJobs);
router.post("/postJobs",isAuthorized ,postJobs);
router.get("/getMyJobs",isAuthorized, getMyJobs);
router.put("/update/:id",isAuthorized, updateJob);
router.delete("/Delete/:id",isAuthorized, deletJobs);

updateJob

export default router;
