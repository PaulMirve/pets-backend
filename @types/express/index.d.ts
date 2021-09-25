import IUser from "../../src/interfaces/User";

declare global {
    namespace Express {
        interface Request {
            currentUser: IUser
        }
    }
}