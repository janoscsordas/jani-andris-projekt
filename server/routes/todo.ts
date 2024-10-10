import express from "express"
import authMiddleware from "../middlewares/authMiddleware"
import { addTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todoController"

const todosRouter = express.Router()

todosRouter.use(authMiddleware)

todosRouter.get("/", getTodos)

todosRouter.post("/add", addTodo)

todosRouter.patch("/:id", updateTodo)

todosRouter.delete("/:id", deleteTodo)

export default todosRouter
