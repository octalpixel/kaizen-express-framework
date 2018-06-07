import { Model, Document, Schema } from "mongoose"
import KDIResponseData from "../BaseInterface/KDIResponseData"
import ResponseHelper from "../Helpers/ResponseHelper"
import { SecureClientSessionOptions } from "http2";
export default class KDService {

    model: Model<Document>
    constructor(model: Model<Document>) {
        this.model = model;

        this.create = this.create.bind(this)
        this.delete = this.delete.bind(this)
        this.getAll = this.getAll.bind(this)
        this.getOne = this.getOne.bind(this)
        this.update = this.update.bind(this)
    }


    async create(data: Object) {
        try {
            let modelDocument: Document = new this.model(data);
            let createdData = await modelDocument.save();

            return ResponseHelper.serviceSuccessResponse(createdData)


        } catch (ex) {

            console.log(ex)
            return ResponseHelper.serviceFailedResponse(`Internal Server Error. Failed to create ${this.model.modelName}`)
        }
    }


    async getAll() {

        try {

            let allData = await this.model.find()

            return ResponseHelper.serviceSuccessResponse(allData)

        } catch (ex) {
            //log the error
            console.log(ex.message)
            return ResponseHelper.serviceFailedResponse("Failed to get data")
        }

    }

    async getOne(id: Schema.Types.ObjectId) {

        try {

            let getOneData = await this.model.findOne({ _id: id });

            return ResponseHelper.serviceSuccessResponse(getOneData)


        } catch (ex) {

            return ResponseHelper.serviceFailedResponse("Failed to get data");

        }

    }

    async update(id: Schema.Types.ObjectId, newData: Object) {

        try {
            let updateData = await this.model.findByIdAndUpdate({ _id: id }, newData, { new: true });

            if (updateData) {
                return ResponseHelper.serviceSuccessResponse(updateData)
            } else  {
                return ResponseHelper.serviceFailedResponse("Entry Not Found!! Unable to update entry")
            }

        } catch (ex) {
            return ResponseHelper.serviceFailedResponse("Unable to Update Entry")
        }

    }


    async delete(id:Schema.Types.ObjectId){

        try{
            let deleteStatus =  await this.model.findByIdAndRemove({_id:id})

            if(deleteStatus){
                return ResponseHelper.serviceSuccessResponse("Deleted Entry")
            }else {
                return ResponseHelper.serviceFailedResponse("Entry Not Found!! Unable to delete entry")
            }

        }catch(ex){
            return ResponseHelper.serviceFailedResponse("Unable to Delete Entry")
        }

    }
} 