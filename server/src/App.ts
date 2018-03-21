import * as express from "express";
import { Request, Response, NextFunction } from 'express-serve-static-core';
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as morgan from 'morgan';
import * as bluebird from 'bluebird';
import * as expressValidator from "express-validator";
import * as cors from "cors";
import {mongoURI} from "./config/development";
import {jwtCheck} from "./middlewares/check-jwt";

const userController = require( "./controllers/account");
const API_URL = 'http://localhost:4200';

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
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// CORS
const options:cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: API_URL,
    preflightContinue: false
};

app.use(cors(options));

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: 'Hello World!'
    });
});

app.post("/api/accounts/signup", userController.postSignup);
app.post("/api/accounts/login", userController.postLogin);

app.route("/api/accounts/profile")
    .get(jwtCheck, userController.getProfile)
    .post();


export default app;