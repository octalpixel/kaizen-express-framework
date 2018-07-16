import { KDController } from "../../../app.core.config";
import { singleQuestionModel, ISingleAnswerQuestion } from "../../Models/QuestionManager/SingleAnswerQuestion";
import { SingleQuestionService } from "../../Services/QuestionManagerService/SingleQuestionService";
import ResponseHelper from "../../../core/Helpers/ResponseHelper";
import KDIResponseData from "../../../core/BaseInterface/KDIResponseData";


import { Request, Response, NextFunction } from 'express';
import { ObjectID } from "bson";
import { Schema, Types } from "mongoose";


/**
 * Let this controller not extend the KDController Class
 * Let this be the business logic of adding questions to the QuestionSet 
 * QuestionManager Controllers will handle the logic of anything related to questions
 * For now only single question are taken into consideration
 */

export default class SingleAnswerQuestionController extends KDController {


    private saqService: SingleQuestionService
    constructor() {
        super()
        this.saqService = new SingleQuestionService()
        this.setService(this.saqService)
        this.createQuestion = this.createQuestion.bind(this)
        this.getAllQuestions = this.getAllQuestions.bind(this)
        this.getQuestionById =  this.getQuestionById.bind(this)
    }

    async createQuestion(req: Request, res: Response, next: NextFunction) {

        try {
            let setData: ISingleAnswerQuestion = req.body
            let createdQuestion = await this.saqService.create_SA_Question(setData)
            console.log(createdQuestion)
            return ResponseHelper.requestHandler(createdQuestion, res)
        } catch (err) {
            let errorData: KDIResponseData = { success: false, msg: err.message }
            return ResponseHelper.requestHandler(errorData, res);
        }

    }

    async getAllQuestions(req: Request, res: Response, next: NextFunction) {
        try {
            const allQuestions = await this.saqService.getAll_SA_Questions();
            return ResponseHelper.requestHandler(allQuestions, res)
        } catch (error) {
            return ResponseHelper.serviceFailedResponse(error.message)
        }
    }

    async getQuestionById(req: Request, res: Response, next: NextFunction) {
        try {
            const question_id = req.params.question_id;
            const isObjectId = Types.ObjectId.isValid(question_id)

            if (isObjectId) {
                let question = await this.saqService.getQuestionById(question_id);
                console.log(question)
                return ResponseHelper.requestHandler(question, res)

            } else {
                return ResponseHelper.requestFailedResponse('Invalid Id',res)
            }


        } catch (error) {
            return ResponseHelper.requestFailedResponse(error.message,res)
        }
    }
}