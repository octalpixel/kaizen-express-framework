
/**
 * KDController is the base controller class to that is to be extended by other controller files
 * Request Handler Functions for the Express Routes
 */


/**
 * Passes the Model Created 
 * Access Base Service Class 
 * 
 */


import { Request, Response, NextFunction } from "express"
import { Model ,Document} from "mongoose"
import KDService from "../BaseService/KDService"
import KDResponseDataInterface from "../BaseInterface/KDResponseDataInterface"

export class KDController {

    // class members
    private model: Model<any>
    private baseService:KDService;
    private responseData:KDResponseDataInterface;

    //constructor
    constructor(model: Model<Document>) {
        this.model = model;
        this.baseService =  new KDService(model);
        this.responseData = {success:false}

    }

    //Create Request Handler

    async create(req: Request, res: Response, next: NextFunction) {

        try{
            this.responseData = await this.baseService.create(req.body)

            res.json(this.responseData)

        }catch{
            this.responseData.success = false
            this.responseData.msg =  `Failed to create ${this.model.modelName}`
            res.json(this.responseData)
        }

    }

    //Read Request Handler

    async get(req: Request, res: Response, next: NextFunction) {

    }


    // Update Request Handle

    async update(req: Request, res: Response, next: NextFunction) {

    }

    //Delete Request Handle

    async delete(req: Request, res: Response, next: NextFunction) {

    }



}