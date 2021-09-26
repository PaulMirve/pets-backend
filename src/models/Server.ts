import express from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config';
import routes from '../routes';
import fileUpload from 'express-fileupload';

export default class Server {
    private app;
    private port;
    private paths: { [key: string]: string };
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            users: '/api/users',
            auth: '/api/auth',
            posts: '/api/posts'
        }
        this.dbConnect();
        this.middlewares();
        this.routes();
    }

    dbConnect = async () => {
        await dbConnection();
    }

    middlewares = () => {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes = () => {
        this.app.use(this.paths.users, routes.userRoutes);
        this.app.use(this.paths.auth, routes.authRoutes);
        this.app.use(this.paths.posts, routes.postRoutes);
    }

    listen = () => {
        this.app.listen(this.port, () => console.log(`Server running on port ${this.port}`));
    }
}