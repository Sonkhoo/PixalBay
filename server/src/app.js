// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());



// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
//import axios from 'axios';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: "16kb"})) //form data
app.use(express.urlencoded({extended: true, limit: "16kb"})) //url data
app.use(express.static("public")) //to store some images or favicons etc
app.use(cookieParser()) //using cookie-parser

//Importing Routes

import userrouter from './routes/user.routes.js';
import imagesrouter from './routes/image.routes.js';

//Routes

app.use("/api/users",userrouter);   
app.use("/api",imagesrouter);

export default app