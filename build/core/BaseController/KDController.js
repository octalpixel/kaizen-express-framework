"use strict";
/**
 * KDController is the base controller class to that is to be extended by other controller files
 * Request Handler Functions for the Express Routes
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const KDService_1 = require("../BaseService/KDService");
const ResponseHelper_1 = require("../Helpers/ResponseHelper");
class KDController {
    //constructor
    constructor(model) {
        this.responseData = { success: false };
        this.model = model;
        this.baseService = new KDService_1.default(model);
        ///console.log(this.baseService)
        this.create = this.create.bind(this);
        this.ResponseHelper = new ResponseHelper_1.default();
    }
    //Create Request Handler
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                this.responseData = yield this.baseService.create(req.body);
                ResponseHelper_1.default.successRequestResponse(this.responseData.data, 200, res);
            }
            catch (err) {
                this.responseData.success = false;
                this.responseData.msg = `Failed to create ${this.model.modelName}`;
                console.log(err);
                //res.json(this.responseData)
                res.send(err);
            }
        });
    }
    //Read Request Handler
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send("This has been loaded");
        });
    }
    // Update Request Handle
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //Delete Request Handle
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = KDController;
//# sourceMappingURL=KDController.js.map