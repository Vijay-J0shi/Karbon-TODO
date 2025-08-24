import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.route.js"

import todoroute from "./routes/todo.route.js"


dotenv.config()
const port= process.env.PORT
let app= express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://karbon-todo-frontend.onrender.com",
    credentials:true
}))


app.use("/api/auth",authRouter)
app.use("/api/user", userRouter )
app.use("/api/todo",todoroute)

app.listen(port,()=>{
    connectDb();
    console.log(`Server Started at ${port}`)
})

