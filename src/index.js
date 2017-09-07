/* eslint-disable*/
import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import glob from "glob";
import chalk from "chalk";
import db from "./mongodb/db.js";
import bodyParser from "body-parser";
const appConfig = require('./../config/app.js');

const app = express();
app.server = http.createServer(app);

// logger
app.use(morgan("dev"));
app.use(cors());
app.use(db());

// 3rd party middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../uploads')))
const initRoutes = (app) => {
    // including all routes
    glob("./routes/*.js", {
        cwd: path.resolve("./src")
    }, (err, routes) => {
        if (err) {
            console.log(chalk.red("Error occured including routes"));
            return;
        }
        routes.forEach((routePath) => {
            require(routePath).default(app); // eslint-disable-line
        });
        console.log(chalk.green("included " + routes.length + " route files"));
    });
};
initRoutes(app);

app.server.listen(process.env.PORT || 3003);
console.log("Started on port " + 3003);
// Setup API document
const setupSwagger = require('./../config/swagger');

export default setupSwagger(express, app);