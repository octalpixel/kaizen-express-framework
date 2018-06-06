"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const PostController_1 = require("./Controllers/PostController");
const Post_1 = require("./Models/Post");
const bodyParser = require("body-parser");
const cors = require("cors");
class Server {
    constructor() {
        this.app = express();
        this.configs();
        this.routes();
    }
    configs() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        // MongoDB Connection
        const MONGO_URI = 'mongodb://localhost/kaizen-test';
        mongoose.connect(MONGO_URI, { useMongoClient: true }, (err) => {
            if (err)
                throw err;
            console.log("MongoDB connection established");
        });
    }
    routes() {
        let postController = new PostController_1.default(Post_1.default);
        this.app.post('/api/post', postController.create);
        this.app.get("/api/post", postController.get);
    }
}
exports.default = new Server().app;
//# sourceMappingURL=ExpressServer.js.map