import { Request, Response, NextFunction } from 'express';

export const validateFile = (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            message: 'There is no file in the request'
        });
    }

    next();
}
