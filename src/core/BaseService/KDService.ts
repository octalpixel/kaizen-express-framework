import { Model, Document } from "mongoose"
import KDResponseDataInterface from "../BaseInterface/KDResponseDataInterface"
import ResponseHelper from "../Helpers/ResponseHelper"
export default class KDService {

    model: Model<Document>
    constructor(model: Model<Document>) {
        this.model = model;

        this.create = this.create.bind(this)
    }


    async create(data: Object) {
        try {
            let modelDocument: Document = new this.model(data);
            let createdData = await modelDocument.save();
        
            // return ResponseHelper.


        } catch(ex) {
            console.log("This is the header")
            let returnResponse:KDResponseDataInterface ={success:true}
            returnResponse.success = false;
            returnResponse.msg = `Internal Server Error. Failed to create ${this.model.modelName}`
            console.log(ex)
            return returnResponse;

            

        }
    }

} 