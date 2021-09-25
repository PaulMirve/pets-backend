import { NextFunction, Request, Response } from "express";

export const tieneRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.currentUser.role)) {
            return res.status(401).json({
                msg: `This service require one of this roles: ${roles}`
            });
        }

        next();
    }
}
