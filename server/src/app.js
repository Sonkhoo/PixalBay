
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {clerkMiddleware} from '@clerk/express'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: "16kb"})) //form data
app.use(express.urlencoded({extended: true, limit: "16kb"})) //url data
app.use(express.static("public")) //to store some images or favicons etc
app.use(cookieParser()) //using cookie-parser
app.use(clerkMiddleware({publicRoutes: ['/'] }));
//Importing Routes

import userrouter from './routes/user.routes.js';
import imagesrouter from './routes/image.routes.js';

//Routes

app.use("/api/users",userrouter);   
app.use("/api",imagesrouter);

export default app