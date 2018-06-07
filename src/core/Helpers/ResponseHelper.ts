import KDIResponseData from "../BaseInterface/KDIResponseData";
import { Response } from "express";
export default class ResponseHelper {

    public static requestFailedResponse(msg: string, statusCode: number, res: Response) {

        let responseData: KDIResponseData = {
            success: false,
            msg: msg
        }

        res.status(statusCode).json(responseData)

    }


    public static requestSuccessResponse(data: Object | string | null, statusCode: number, res: Response) {

        let responseData: KDIResponseData = {
            success: false,
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

    public static requestHandler(responseData:KDIResponseData ,res:Response){

        
        if (responseData != undefined) {

            if (responseData.success) {
                ResponseHelper.requestSuccessResponse(responseData.data, 200, res)
            } else {
                ResponseHelper.requestFailedResponse(responseData.msg, 400, res)
            }
        } else {
            ResponseHelper.requestFailedResponse("Opps Something Went Wrong", 400, res)
        }

    }

    public static internalErrorResponse(res:Response){
        ResponseHelper.requestFailedResponse("Internal Error" , 500 , res)
    }



}