import express from "express"
import isAuth from "../middleware/isAuth.js"
import {delUser, getCurrentUser} from "../controllers/user.controller.js"

let userRouter = express.Router()
userRouter.get("/currentuser",isAuth, getCurrentUser)

userRouter.delete("/delete",delUser)

export default userRouter