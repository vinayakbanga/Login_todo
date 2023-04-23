import express from "express";
import { User } from "../models/usermodel.js";
import { getAllUsers, getMyDetail, login, logout, register } from "../controllers/usercontroller.js";
import { isAuthenticated } from "../middleware/auth.js";
// User
const router = express.Router();

router.get("/all",getAllUsers);
 router.post("/new",register)
 router.post("/login",login)
 router.get("/logout",isAuthenticated,logout)

router.get("/me",isAuthenticated,getMyDetail) 


 




export default router