import * as express from "express";
import { Request, Response, NextFunction } from 'express'
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as morgan from 'morgan';
import * as bluebird from 'bluebird';
import * as cors from 'cors';
import {mongoURI} from "./config/development";

// Create Express server
const app = express();

// Connect to MongoDB
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoURI, {useMongoClient: true}).then(
    () => {
        console.log('Connected MongoDB');
    },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// CORS
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: 'Hello World!'
    });
});

export default app;