import  KDController from "../../core/BaseController/KDController"
import {Model,Document} from "mongoose"

export default class PostController extends KDController{


    constructor(model:Model<Document>){
        super(model)
    }

}