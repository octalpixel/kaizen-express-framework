import KDController from "../../../core/BaseController/KDController"
import { postModel } from "../../Models/Post"
import { Request, Response, NextFunction } from "express"
import ResponseHelper from "../../../core/Helpers/ResponseHelper"
import { PostService } from "../../Services/PostService/PostService"

export default class PostController extends KDController {

    private postService: PostService
    constructor() {
        super(postModel)
        this.postService = new PostService()
        this.getAllPost = this.getAllPost.bind(this)
    }


    async getAllPost(req: Request, res: Response, next: NextFunction) {
        try {

            let getPost = await this.postService.getAllPost()
            
            ResponseHelper.requestSuccessResponse(getPost, res)


        } catch (err) {

            ResponseHelper.requestFailedResponse(err.message, res)

        }
    }

}