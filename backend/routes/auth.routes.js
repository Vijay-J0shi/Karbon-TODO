import express from "express"
import { logOut, signUp } from "../controllers/auth.controller.js"
import { logIn } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",logIn)
authRouter.post("/logout",logOut)

export default authRouter