import KDIResponseData from "../BaseInterface/KDIResponseData";
import { Response } from "express";


export interface IResponseParams {
    res: Response,
    msg?: string,
    data?: string | object | null,
    statusCode?: number
}

export default class ResponseHelper {




    public static requestFailedResponse(msg: string, res: Response, statusCode: number = 400, data?: Object | null) {

        let responseData: KDIResponseData = {
            success: false,
            msg: msg,
            data: data
        }

        res.status(statusCode).json(responseData)

    }


    public static requestSuccessResponse(data: Object | string | null, res: Response, statusCode: number = 200) {

        let responseData: KDIResponseData = {
            success: true,
            data: data
        }

        res.status(statusCode).json(responseData)

    }

    public static serviceFailedResponse(msg: string) {

        let responseData: KDIResponseData = {
            success: false,
            msg: msg
        }

        return responseData;

    }

    public static serviceSuccessResponse(data: Object | string | null) {

        let responseData: KDIResponseData = {
            success: true,
            data: data
        }

        return responseData;

    }

    public static requestHandler(responseData: KDIResponseData, res: Response) {


        if (responseData != undefined) {

            if (responseData.success) {
                ResponseHelper.requestSuccessResponse(responseData.data, res, 200)
            } else {
                ResponseHelper.requestFailedResponse(responseData.msg, res, 400)
            }
        } else {
            ResponseHelper.requestFailedResponse("Opps Something Went Wrong", res, 400)
        }

    }

    public static internalErrorResponse(res: Response) {
        ResponseHelper.requestFailedResponse("Internal Error", res, 500)
    }



}