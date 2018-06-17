"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseHelper_1 = require("../Helpers/ResponseHelper");
class KDService {
    constructor(model) {
        this.model = model;
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.update = this.update.bind(this);
    }
    async create(data) {
        try {
            let modelDocument = new this.model(data);
            let createdData = await modelDocument.save();
            return ResponseHelper_1.default.serviceSuccessResponse(createdData);
        }
        catch (ex) {
            console.log(ex);
            return ResponseHelper_1.default.serviceFailedResponse(`Internal Server Error. Failed to create ${this.model.modelName}`);
        }
    }
    async getAll() {
        try {
            let allData = await this.model.find();
            return ResponseHelper_1.default.serviceSuccessResponse(allData);
        }
        catch (ex) {
            //log the error
            console.log(ex.message);
            return ResponseHelper_1.default.serviceFailedResponse("Failed to get data");
        }
    }
    async getOne(id) {
        try {
            let getOneData = await this.model.findOne({ _id: id });
            return ResponseHelper_1.default.serviceSuccessResponse(getOneData);
        }
        catch (ex) {
            return ResponseHelper_1.default.serviceFailedResponse("Failed to get data");
        }
    }
    async update(id, newData) {
        try {
            let updateData = await this.model.findByIdAndUpdate({ _id: id }, newData, { new: true });
            if (updateData) {
                return ResponseHelper_1.default.serviceSuccessResponse(updateData);
            }
            else {
                return ResponseHelper_1.default.serviceFailedResponse("Entry Not Found!! Unable to update entry");
            }
        }
        catch (ex) {
            return ResponseHelper_1.default.serviceFailedResponse("Unable to Update Entry");
        }
    }
    async delete(id) {
        try {
            let deleteStatus = await this.model.findByIdAndRemove({ _id: id });
            if (deleteStatus) {
                return ResponseHelper_1.default.serviceSuccessResponse("Deleted Entry");
            }
            else {
                return ResponseHelper_1.default.serviceFailedResponse("Entry Not Found!! Unable to delete entry");
            }
        }
        catch (ex) {
            return ResponseHelper_1.default.serviceFailedResponse("Unable to Delete Entry");
        }
    }
}
exports.default = KDService;
//# sourceMappingURL=KDService.js.map