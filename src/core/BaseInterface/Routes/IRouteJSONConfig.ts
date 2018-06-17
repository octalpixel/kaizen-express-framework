export interface IRouteJSONConfig {


    path: string,
    controller: string,
    hasMiddleware?:boolean,
    middleware?:string
    handlers: {
        GET?: string,
        POST?: string,
        PUT?: string,
        DELETE?: string
    }



}