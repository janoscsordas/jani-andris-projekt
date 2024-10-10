import type { Request, Response } from "express";
import { Todo } from "../models/todoModel";
import mongoose from "mongoose";

import type { AuthenticatedRequest } from "../middlewares/authMiddleware";


export const getTodos = async (req: AuthenticatedRequest, res: Response) => {
    const user_id = req.user?._id

    const todos = await Todo.find({ userId: user_id }).sort({ createdAt: -1 });

    if (!todos) {
        res.status(400).json({ error: "Nincsenek todo-k!" });
        return
    }

    res.status(200).json({ todos });
}

export const addTodo = async (req: Request, res: Response) => {
    const { userId, title, description, completed }: { userId: string, title: string, description: string, completed: boolean } = await req.body;

    if (!userId || !title || !description || typeof completed === "undefined") {
        res.status(400).json({ error: "Nem adott meg minden adatot a todo-hoz!" });
        return
    }

    const todo = await Todo.create({ userId, title, description, completed });

    if (!todo) {
        res.status(400).json({ error: "Nem sikerült hozzáadni a todo-t!" });
        return
    }

    res.status(200).json({ todo });
}

export const updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: 'Nincs ilyen TODO!'});
        return
    }

    const todo = await Todo.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!todo) {
        res.status(400).json({ error: "Nem sikerült frissíteni a todo-t!" });
        return
    }

    res.status(200).json({ todo });
}

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ error: "Nem adott meg minden adatot a todo-hoz!" });
        return
    }

    const todo = await Todo.findOneAndDelete({ _id: id });

    if (!todo) {
        res.status(400).json({ error: "Nem sikerült törölni a todo-t!" });
        return
    }

    res.status(200).json({ todo });
}
