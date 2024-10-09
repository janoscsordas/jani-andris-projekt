import jwt from "jsonwebtoken"
import { type IUser } from "../models/userModel"

export async function createJWTToken(user: IUser) {
    return jwt.sign({ user }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
    })
}

export async function verifyJWTToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!)
}
