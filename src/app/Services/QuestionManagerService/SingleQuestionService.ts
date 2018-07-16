import { KDService } from "../../../app.core.config";
import { ISingleAnswerQuestion, singleQuestionModel } from "../../Models/QuestionManager/SingleAnswerQuestion"
import ResponseHelper from "../../../core/Helpers/ResponseHelper";
import { IQuestionSet } from "../../Models/QuestionManager/QuestionSet";
import { Document, Schema, Types } from "mongoose";

export class SingleQuestionService extends KDService {

    constructor() {
        super()
        super.setModel(singleQuestionModel)
    }

    async getAll_SA_Questions() {
        try {
            let allQuestions = await singleQuestionModel.find().populate('admin_id', '-email')
            return ResponseHelper.serviceSuccessResponse(allQuestions)
        } catch (error) {
            return ResponseHelper.serviceFailedResponse(error.message)
        }
    }

    async create_SA_Question(question: ISingleAnswerQuestion) {
        try {

            let createdQuestion: Document = new singleQuestionModel(question);
            await createdQuestion.save();
            let newQuestion = await createdQuestion.populate("author", '-email');
            console.log(newQuestion)
            return ResponseHelper.serviceSuccessResponse(newQuestion);
        } catch (error) {
            return ResponseHelper.serviceFailedResponse(error.message)
        }

    }

    async getQuestionById(question_id: Types.ObjectId) {

        try {
            
            let getQuestions =  await this.getOne(question_id);
            
            return getQuestions;
        } catch (error) {
            return ResponseHelper.serviceFailedResponse(error.message)
        }

    }

}

export const singleQuestionService = new SingleQuestionService()