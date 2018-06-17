"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const util_1 = require("util");
const controller = require("./app.controller.config");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
class Server {
    constructor() {
        this.app = express();
        this.configs();
        // this.routes();
        this.handleRouteFile();
    }
    configs() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        // MongoDB Connection
        const MONGO_URI = 'mongodb://localhost/kaizen-test';
        mongoose.connect(MONGO_URI, (err) => {
            if (err)
                throw err;
            console.log("MongoDB connection established");
        });
    }
    routes() {
        let postController = new controller.PostController();
        this.app.post('/api/post', postController.create);
        this.app.get("/api/post", postController.get);
        console.log("Routes are called from this");
    }
    async handleRouteFile() {
        try {
            const fileAccess = util_1.promisify(fs.access);
            let jsonFile = "./src/routes/routes.json";
            console.log(path.resolve(jsonFile));
            // Error is thrown when file doesnt exist
            let routeExists = await fileAccess(path.resolve(jsonFile), fs.constants.F_OK);
            const readFile = util_1.promisify(fs.readFile);
            let jsonRoute = await readFile(jsonFile, 'utf8');
            if (jsonRoute.length < 0 || jsonRoute != null) {
                let jsonData = JSON.parse(jsonRoute);
                jsonData.forEach(route => {
                    let baseUrl = route.base_url;
                    let routeConfigs = route.configs;
                    routeConfigs.forEach(routeConfig => {
                        let routeController = new controller[routeConfig.controller]();
                        let path = routeConfig.path;
                        let handlers = routeConfig.handlers;
                        for (const method in handlers) {
                            if (method.length >= 3) {
                                let methodLowerCase = method.toLowerCase();
                                // console.log(controller[handlers[method]()])
                                console.log(baseUrl + path);
                                this.app[methodLowerCase](baseUrl + path, routeController[handlers[method]]);
                            }
                        }
                    });
                });
            }
            else {
                throw new Error("JSON Route not proper");
            }
        }
        catch (ex) {
            console.log(ex.message);
            console.log('This is actually and error');
            // throw ex;
        }
    }
}
exports.default = new Server().app;
//# sourceMappingURL=ExpressServer.js.map