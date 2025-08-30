import { JWT_SECRET } from "@repo/backend-common/env";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"];

    if(!token) {
        res.json({
            message: "Access token missing"
        })
        return;
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if(!(decoded as JwtPayload).userId) {
        res.json({
            message: "Invalid token"
        })
        return;
    } else {
        req.userId = (decoded as JwtPayload).userId;
        next();
    }
}