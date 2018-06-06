"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHelper {
    static failedRequestResponse(msg, statusCode, res) {
        let responseData = {
            success: false,
            msg: msg
        };
        res.status(statusCode).json(responseData);
    }
    static successRequestResponse(data, statusCode, res) {
        let responseData = {
            success: false,
            data: data
        };
        res.status(statusCode).json(responseData);
    }
    static failedServiceResponse(msg) {
        let responseData = {
            success: false,
            msg: msg
        };
        return responseData;
    }
    static successServiceResponse(data) {
        let responseData = {
            success: false,
            data: data
        };
        return responseData;
    }
}
exports.default = ResponseHelper;
//# sourceMappingURL=ResponseHelper.js.map