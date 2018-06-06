
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
import { Model, Document } from "mongoose"
import KDService from "../BaseService/KDService"
import KDResponseDataInterface from "../BaseInterface/KDResponseDataInterface"
import ResponseHelper from  "../Helpers/ResponseHelper"

export default class KDController {

    // class members
    private model: Model<any>
    private baseService: KDService;
    private responseData: KDResponseDataInterface = { success: false };
    public ResponseHelper:ResponseHelper;

    //constructor
    constructor(model: Model<Document>) {
        this.model = model;
        this.baseService = new KDService(model);
        ///console.log(this.baseService)
        this.create = this.create.bind(this)
        this.ResponseHelper =  new ResponseHelper();

    }

    //Create Request Handler

    async create(req: Request, res: Response, next: NextFunction) {
        console.log(req.body)
        try {

            this.responseData = await this.baseService.create(req.body)
            
            ResponseHelper.successRequestResponse(this.responseData.data,200,res)
            

        }catch(err){
            this.responseData.success = false
            this.responseData.msg = `Failed to create ${this.model.modelName}`
            console.log(err)
            //res.json(this.responseData)
            res.send(err)
        }

    }

    //Read Request Handler

    async get(req: Request, res: Response, next: NextFunction) {
        res.send("This has been loaded")
    }


    // Update Request Handle

    async update(req: Request, res: Response, next: NextFunction) {

    }

    //Delete Request Handle

    async delete(req: Request, res: Response, next: NextFunction) {

    }



}