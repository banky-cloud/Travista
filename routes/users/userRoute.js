import { Router } from "express";
import Register from "./controllers/register.js";
import login from "./controllers/login.js";
import sendCode from "./controllers/sendCode.js";
import resetPassword from "./controllers/resetPassword.js";
import loginWithToken from "./controllers/loginWithToken.js";

const userRouter=Router()

userRouter.post("/register",Register)
userRouter.post("/login",login)
userRouter.post("/sendcode",sendCode)
userRouter.post("/resetpassword",resetPassword)
userRouter.post("/token",loginWithToken)






export default userRouter