import { Model, Document } from "mongoose"
import KDResponseDataInterface from "../BaseInterface/KDResponseDataInterface"
export default class KDService {

    model: Model<Document>
    returnResponse: KDResponseDataInterface

    constructor(model: Model<Document>) {
        this.model = model;
        this.returnResponse = { success: false, data: null };
    }


    async create(data: Object) {
        try {
            let modelDocument: Document = new this.model(data);
            let createdData = await modelDocument.save();
            
            this.returnResponse.success = true;
            this.returnResponse.data = createdData;

            return this.returnResponse;


        } catch (ex) {

            this.returnResponse.success = false;
            return this.returnResponse;

        }
    }

} 