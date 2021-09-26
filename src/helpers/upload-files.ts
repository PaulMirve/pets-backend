import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { FileArray, UploadedFile } from "express-fileupload";

const uploadFile = (file: UploadedFile, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder: string = ''): Promise<string> => {
    return new Promise((resolve, reject) => {
        const nombreCortado = file.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        if (!validExtensions.includes(extension)) {
            return reject(`La extensión ${extension} no es valida`);
        }
        const nombreTemp = `${uuidv4()}.${extension}`;
        const uploadPath = path.join(__dirname, '../uploads/', folder, nombreTemp);
        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(nombreTemp);
        });
    });
}

export default uploadFile;