import express from "express";
import { register } from "../controller/userController.js";
import { login } from "../controller/userController.js";
import { logout,getUser } from "../controller/userController.js";
import isAuthorized from "../middleware/auth.js";

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",isAuthorized,logout);
router.get("/getUserDetails",isAuthorized,getUser);

export default router;

