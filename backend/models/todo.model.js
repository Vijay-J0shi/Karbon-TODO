import mongoose, { Model }  from "mongoose";


const todoSchema= new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", 
        required: true },
    title:{
        type: String,
        required : true 
    },
    detail: String,
    priority: String,
    completed: Boolean,
    createdAt: { type: Date, default: Date.now },
})

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
