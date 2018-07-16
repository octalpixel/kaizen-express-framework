import { KDService } from "../../../app.core.config"
import { Document } from "mongoose"
import { IPost, postModel } from "../../Models/Post"
import ResponseHelper from "../../../core/Helpers/ResponseHelper"
import { Request, Response, NextFunction } from "express"

export class PostService extends KDService {

    constructor() {
        super()
        super.setModel(postModel)
    }


    async getAllPost() {

        try {

            let getPost = await postModel.find().populate("author",'-email')

            return ResponseHelper.serviceSuccessResponse(getPost).data


        } catch (err) {

            return ResponseHelper.serviceFailedResponse(err.message)

        }

    }

}