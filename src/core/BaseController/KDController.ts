
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
import KDIResponseData from "../BaseInterface/KDIResponseData"
import ResponseHelper from "../Helpers/ResponseHelper"

export default class KDController {

    // class members
    private model: Model<any>
    private baseService: KDService;


    //constructor
    constructor(model: Model<Document>) {
        this.model = model;
        this.baseService = new KDService(model);
        ///console.log(this.baseService)
        this.create = this.create.bind(this)
        this.get = this.get.bind(this)
        this.getOne = this.getOne.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)


    }

    //Create Request Handler
    async create(req: Request, res: Response, next: NextFunction) {
        //console.log(req.body)
        try {

            //Validation Comes here

            let responseData = await this.baseService.create(req.body)

            return ResponseHelper.requestHandler(responseData, res);


        } catch (err) {
            return ResponseHelper.internalErrorResponse(res)
        }

    }

    //Read Request Handler

    //Get All the Results
    async get(req: Request, res: Response, next: NextFunction) {

        try {

            let responseData = await this.baseService.getAll();

            return ResponseHelper.requestHandler(responseData, res)


        } catch (ex) {
            console.log(ex.message)
            ResponseHelper.internalErrorResponse(res)
        }

    }

    async getOne(req: Request, res: Response, next: NextFunction) {

        try {

            let responseData = await this.baseService.getOne(req.params.id);

            return ResponseHelper.requestHandler(responseData, res)

        } catch (ex) {
            ResponseHelper.internalErrorResponse(res)
        }


    }

    // Update Request Handle

    async update(req: Request, res: Response, next: NextFunction) {

        try {

            let responseData = await this.baseService.update(req.params.id, req.body);

            return ResponseHelper.requestHandler(responseData, res)

        } catch (ex) {
            ResponseHelper.internalErrorResponse(res)
        }

    }

    //Delete Request Handle

    async delete(req: Request, res: Response, next: NextFunction) {

        try {

            let responseData = await this.baseService.delete(req.params.id);

            return ResponseHelper.requestHandler(responseData, res)

        } catch (ex) {
            ResponseHelper.internalErrorResponse(res)
        }

    }



}