import express from 'express';
import dotenv from 'dotenv';
import Server from './models/Server';
dotenv.config();

const app = express();

console.clear();
new Server().listen();