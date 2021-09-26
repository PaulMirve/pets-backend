import { NextFunction, Request, Response } from "express"

export const userHasRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.currentUser.role)) {
            return res.status(401).json({
                message: `The service requires one of the next roles ${roles}`
            });
        }
        next();
    }
}