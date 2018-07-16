import * as express from "express"
import * as mongoose from "mongoose"
// import PostController from "./app/Controllers/PostController"
// import postModel from "./app/Models/Post"
import * as fs from "fs"
import { promisify } from "util"

import * as controller from "./app.controller.config"
import * as AuthMiddleware from "./app.middleware.config"


import * as passport from "passport"





import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import { KDIRouteJSON } from "./core/BaseInterface/Routes/KDIRouteJSON";



class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.configs();
        // this.routes();
        this.handleRouteFile()
    }

    public configs(): void {

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cors());



        // MongoDB Connection
        const MONGO_URI: string = 'mongodb://localhost/kaizen-test';
        mongoose.connect(MONGO_URI, (err) => {
            if (err) throw err;
            console.log("MongoDB connection established")
        });


    }

    public routes(): void {
        let postController = new controller.PostController()
        this.app.post('/api/post', postController.create);
        this.app.get("/api/post", postController.get)

        console.log("Routes are called from this")

    }


    private async handleRouteFile() {
        try {

            const fileAccess = promisify(fs.access)
            let jsonFile = "./src/routes/routes.json"

            console.log(path.resolve(jsonFile))




            // Error is thrown when file doesnt exist
            let routeExists = await fileAccess(path.resolve(jsonFile), fs.constants.F_OK);

            const readFile = promisify(fs.readFile)

            let jsonRoute = await readFile(jsonFile, 'utf8');

            if (jsonRoute.length < 0 || jsonRoute != null) {

                let jsonData: Array<KDIRouteJSON> = JSON.parse(jsonRoute)

                jsonData.forEach(route => {
                    // console.log(route)
                    let baseUrl = route.base_url
                    let routeConfigs = route.configs
                    routeConfigs.forEach(routeConfig => {

                        // console.log(routeConfig)

                        let routeController = new controller[routeConfig.controller]()
                        let path = routeConfig.path

                        let handlers = routeConfig.handlers

                        let hasMiddleware = routeConfig.hasMiddleware



                        for (const method in handlers) {

                            if (method.length >= 3) {
                                let methodLowerCase = method.toLowerCase();
                                // console.log(controller[handlers[method]()])
                                console.log(baseUrl + path)

                                if (hasMiddleware) {
                                    let middleware = routeConfig.middleware;
                                    let middlewareController = middleware.split(".")[0];
                                    let middlewareFunction = middleware.split(".")[1];
                                    console.log(middlewareFunction)

                                    this.app.use(AuthMiddleware[middlewareController].initialize())

                                    this.app[methodLowerCase](baseUrl + path, AuthMiddleware[middlewareController][middlewareFunction], routeController[handlers[method]])

                                } else {
                                    this.app[methodLowerCase](baseUrl + path, routeController[handlers[method]])
                                }
                            }
                        }




                    });
                });


            } else {
                throw new Error("JSON Route not proper")
            }




        } catch (ex) {
            console.log(ex.message)
            console.log('This is actually and error')
            // throw ex;
        }
    }

}


export default new Server().app;
