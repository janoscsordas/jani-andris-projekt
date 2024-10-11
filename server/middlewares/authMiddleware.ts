import type { NextFunction, Request, RequestHandler, Response } from "express";
import { User, type IUser } from "../models/userModel";
import jwt, { type JwtPayload } from "jsonwebtoken"

export interface AuthenticatedRequest extends Request {
    user?: IUser
}

const authMiddleware: RequestHandler = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // verify user is authenticated
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).json({ error: 'Nincs bejelentkezve, kérem jelentkezzen be!' })
        return
    }

    const token = authorization.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const { _id } = decodedToken;

        req.user = await User.findOne(_id).select('_id');

        next()
    } catch (error: any) {
        res.status(401).json({ error: 'A Kéréshez be kell jelentkeznie!' })
    }
}

export default authMiddleware
