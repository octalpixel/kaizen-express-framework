import KDResponseDataInterface from "../BaseInterface/KDResponseDataInterface";
import { Response } from "express";
export default class ResponseHelper {

    public static failedRequestResponse(msg: string, statusCode: number, res: Response) {

        let responseData: KDResponseDataInterface = {
            success: false,
            msg: msg
        }

        res.status(statusCode).json(responseData)

    }


    public static successRequestResponse(data: Object | string | null, statusCode: number, res: Response) {

        let responseData: KDResponseDataInterface = {
            success: false,
            data: data
        }

        res.status(statusCode).json(responseData)

    }

    public static failedServiceResponse(msg: string) {

        let responseData: KDResponseDataInterface = {
            success: false,
            msg: msg
        }

        return responseData;

    }

    public static successServiceResponse(data: Object | string | null) {

        let responseData: KDResponseDataInterface = {
            success: false,
            data: data
        }

        return responseData;

    }



}