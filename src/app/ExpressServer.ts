import * as express from "express"
import * as mongoose from  "mongoose"
import PostController from  "./Controllers/PostController"
import postModel from "./Models/Post"

import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';


class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.configs();
        this.routes();
    }

    public configs(): void {

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cors());


        // MongoDB Connection
        const MONGO_URI: string = 'mongodb://localhost/kaizen-test'; 
        mongoose.connect(MONGO_URI,{ useMongoClient: true },(err)=>{
            if(err) throw err;
            console.log("MongoDB connection established")
        });


    }

    public routes(): void {
        let postController = new PostController(postModel)
        this.app.post('/api/post',postController.create);
        this.app.get("/api/post",postController.get)
    

    }

}


export default new Server().app;
