
import Todo from '../models/todo.model.js'

export const fetchTodo=async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId })
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" })
  }
}
export const insertTodo= async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      user: req.userId,
    })
    await todo.save()
    res.status(201).json(todo)
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" })
  }
}
export const updateTodo=async (req, res) => {
  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    )
    if (!updated) {
      return res.status(404).json({ error: "Todo not found or unauthorized" })
    }
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" })
  }
}


export const delteTodo = async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    })
    if (!deleted) {
      return res.status(404).json({ error: "Todo not found or unauthorized" })
    }
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" })
  }
}



