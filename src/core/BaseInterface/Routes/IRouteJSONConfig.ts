export interface IRouteJSONConfig {


    path: string,
    controller: string,
    handlers: {
        GET?: string,
        POST?: string,
        PUT?: string,
        DELETE?: string
    }



}