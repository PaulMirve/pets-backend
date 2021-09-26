import IUser from "../../src/interfaces/User";

declare global {
    namespace Express {
        interface Request {
            currentUser: IUser
        }
    }
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            MONGODB_CONN: string;
            SECRETORPUBLICKEY: string;
            CLOUDINARY_CLOUD_NAME: string;
            CLOUDINARY_API_KEY: string;
            CLOUDINARY_API_SECRET: string;
        }
    }
}