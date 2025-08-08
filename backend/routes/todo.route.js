import express from 'express'
import Todo from '../models/todo.model.js'
import isAuth from '../middleware/isAuth.js'
import { delteTodo, fetchTodo, insertTodo, updateTodo } from '../controllers/todo.controller.js'

const todoroute = express.Router()

todoroute.use(isAuth)
todoroute.get("/", fetchTodo)



todoroute.post("/",insertTodo)



todoroute.put("/:id", updateTodo)




todoroute.delete("/:id",delteTodo)




export default todoroute
