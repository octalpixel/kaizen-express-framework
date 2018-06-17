"use strict";
/**
 * KDController is the base controller class to that is to be extended by other controller files
 * Request Handler Functions for the Express Routes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const KDService_1 = require("../BaseService/KDService");
const ResponseHelper_1 = require("../Helpers/ResponseHelper");
class KDController {
    //constructor
    constructor(model) {
        this.model = model;
        this.baseService = new KDService_1.default(model);
        ///console.log(this.baseService)
        this.create = this.create.bind(this);
        this.get = this.get.bind(this);
        this.getOne = this.getOne.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    //Create Request Handler
    async create(req, res, next) {
        //console.log(req.body)
        try {
            //Validation Comes here
            let responseData = await this.baseService.create(req.body);
            return ResponseHelper_1.default.requestHandler(responseData, res);
        }
        catch (err) {
            return ResponseHelper_1.default.internalErrorResponse(res);
        }
    }
    //Read Request Handler
    //Get All the Results
    async get(req, res, next) {
        try {
            let responseData = await this.baseService.getAll();
            return ResponseHelper_1.default.requestHandler(responseData, res);
        }
        catch (ex) {
            console.log(ex.message);
            ResponseHelper_1.default.internalErrorResponse(res);
        }
    }
    async getOne(req, res, next) {
        try {
            let responseData = await this.baseService.getOne(req.params.id);
            return ResponseHelper_1.default.requestHandler(responseData, res);
        }
        catch (ex) {
            ResponseHelper_1.default.internalErrorResponse(res);
        }
    }
    // Update Request Handle
    async update(req, res, next) {
        try {
            let responseData = await this.baseService.update(req.params.id, req.body);
            return ResponseHelper_1.default.requestHandler(responseData, res);
        }
        catch (ex) {
            ResponseHelper_1.default.internalErrorResponse(res);
        }
    }
    //Delete Request Handle
    async delete(req, res, next) {
        try {
            let responseData = await this.baseService.delete(req.params.id);
            return ResponseHelper_1.default.requestHandler(responseData, res);
        }
        catch (ex) {
            ResponseHelper_1.default.internalErrorResponse(res);
        }
    }
}
exports.default = KDController;
//# sourceMappingURL=KDController.js.map