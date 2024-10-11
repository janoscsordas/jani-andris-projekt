import type { Request, Response } from "express";

import { User } from "../models/userModel";
import { createJWTToken } from "../lib/JWTFunction";


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = await req.body

        if (!email || !password) {
            throw Error("Nem adta meg az emailt vagy a jelszót!")
        }

        const user = await User.login(email, password)

        // create a token
        const token = await createJWTToken(user)

        res.status(200).json({ id: user._id, email: user.email, name: user.name, token })
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = await req.body

        if (!name || !email || !password) {
            throw Error("Nem adott meg nevet, email-t, vagy jelszót!")
        }

        const user = await User.register(name, email, password)

        if (!user) {
            throw Error("Sikertelen regisztrálás!")
        }

        res.status(200).json({ user })
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}
