import express from 'express';

export default class Server {
    private app;
    private port;
    private paths: { [key: string]: string };
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            users: '/api/users'
        }
    }

    listen = () => {
        this.app.listen(this.port, () => console.log(`Server running on port ${process.env.PORT}`));
    }
}