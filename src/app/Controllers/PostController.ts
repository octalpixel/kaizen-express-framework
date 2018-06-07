import  KDController from "../../core/BaseController/KDController"
import postModel from "../../app/Models/Post"
import {Model,Document} from "mongoose"

export default class PostController extends KDController{

    constructor(){
        super(postModel)
    }

}