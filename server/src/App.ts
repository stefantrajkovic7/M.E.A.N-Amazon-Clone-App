import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as morgan from 'morgan';
import * as bluebird from 'bluebird';
import * as expressValidator from "express-validator";
import * as cors from "cors";
const config = require('./config/development');

const UI_API_URL = 'http://localhost:4200';

// Create Express server
const app = express();

// Connect to MongoDB
(<any>mongoose).Promise = bluebird;
mongoose.connect(config.mongoURI, {useMongoClient: true}).then(
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
    origin: UI_API_URL,
    preflightContinue: false
};

app.use(cors(options));

// Models
require("./models/user.model");

// REST
require('./app-routes')(app);

export default app;