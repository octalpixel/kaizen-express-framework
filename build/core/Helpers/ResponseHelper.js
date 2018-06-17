"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHelper {
    static requestFailedResponse(msg, statusCode, res) {
        let responseData = {
            success: false,
            msg: msg
        };
        res.status(statusCode).json(responseData);
    }
    static requestSuccessResponse(data, statusCode, res) {
        let responseData = {
            success: false,
            data: data
        };
        res.status(statusCode).json(responseData);
    }
    static serviceFailedResponse(msg) {
        let responseData = {
            success: false,
            msg: msg
        };
        return responseData;
    }
    static serviceSuccessResponse(data) {
        let responseData = {
            success: true,
            data: data
        };
        return responseData;
    }
    static requestHandler(responseData, res) {
        if (responseData != undefined) {
            if (responseData.success) {
                ResponseHelper.requestSuccessResponse(responseData.data, 200, res);
            }
            else {
                ResponseHelper.requestFailedResponse(responseData.msg, 400, res);
            }
        }
        else {
            ResponseHelper.requestFailedResponse("Opps Something Went Wrong", 400, res);
        }
    }
    static internalErrorResponse(res) {
        ResponseHelper.requestFailedResponse("Internal Error", 500, res);
    }
}
exports.default = ResponseHelper;
//# sourceMappingURL=ResponseHelper.js.map