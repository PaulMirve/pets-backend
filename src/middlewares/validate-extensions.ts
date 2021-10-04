import { UploadedFile } from 'express-fileupload';
import { NextFunction, Request, Response } from 'express';
const validateExtensions = (req: Request, res: Response, next: NextFunction) => {
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (req.files) {
        const file = req.files["file"] as UploadedFile;
        const splitedName = file.name.split('.');
        const extension = splitedName[splitedName.length - 1];
        if (!validExtensions.includes(extension)) {
            return res.status(400).send({
                message: `${extension} is not a valid extension`
            });
        }
        next();
    }

}

export default validateExtensions;