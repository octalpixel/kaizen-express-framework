import { Schema, Types } from 'mongoose';
import { ISingleAnswerQuestion } from './../../Models/QuestionManager/SingleAnswerQuestion';

import { Response, Request, NextFunction } from 'express';
import { KDController, KDService } from "../../../app.core.config";
import { QuestionSetService } from "../../Services/QuestionManagerService/QuestionSetService";

import { IQuestionSet, IQuestionList } from '../../Models/QuestionManager/QuestionSet';
import ResponseHelper from '../../../core/Helpers/ResponseHelper';
import KDIResponseData from '../../../core/BaseInterface/KDIResponseData';

export default class QuestionManagerController extends KDController {

    private questionService: QuestionSetService

    constructor() {
        super()
        this.questionService = new QuestionSetService()
        this.setService(this.questionService)
        this.getAllQuestionSet = this.getAllQuestionSet.bind(this)
        this.createQuestionSet = this.createQuestionSet.bind(this)

        this.updateQuestionList = this.updateQuestionList.bind(this)
        this.getQuestionSetById = this.getQuestionSetById.bind(this)
    }

    /**
     * List of Methods
     *  - Create Question Set
     *  - Create Single Question
     *  - Update Question List in QuestionSet
     */

    //Create a questionSet 
    async getAllQuestionSet(req: Request, res: Response, next: NextFunction) {
        try {
            let allQuestionSet = await this.questionService.getAllQuestionSet()
            return ResponseHelper.requestHandler(allQuestionSet, res)
        } catch (err) {
            return ResponseHelper.requestFailedResponse("Unable to List all", res)
        }

    }
    async createQuestionSet(req: Request, res: Response, next: NextFunction) {

        try {
            let setData: IQuestionSet = req.body
            let createdSet = await this.questionService.createQuestionSet(setData)
            console.log(createdSet)
            return ResponseHelper.requestHandler(createdSet, res)
        } catch (err) {
            let errorData: KDIResponseData = { success: false, msg: err.message }
            return ResponseHelper.requestHandler(errorData, res);
        }

    }

    async updateQuestionList(req: Request, res: Response, next: NextFunction) {
        try {
            let { questionSet_id, question } = req.body
            questionSet_id = <Schema.Types.ObjectId>questionSet_id;
            question = <IQuestionList>question
            // return ResponseHelper.requestSuccessResponse(data, res)
            let updatedListSet = await this.questionService.updateQuestionList(questionSet_id, question)
            return ResponseHelper.requestHandler(updatedListSet, res)
        } catch (err) {
            let errorData: KDIResponseData = { success: false, msg: err.message }
            return ResponseHelper.requestHandler(errorData, res);
        }
    }

    async getQuestionSetById(req: Request, res: Response, next: NextFunction) {
        try {
            let questionSet_id = req.params.questionset_id;
            if (!Types.ObjectId.isValid(questionSet_id)) {

                return ResponseHelper.requestFailedResponse("Invalid Id Provided", res);
            }
            questionSet_id = questionSet_id as Schema.Types.ObjectId;
            let questionSet = await this.questionService.getQuestionSetById(questionSet_id);
            return ResponseHelper.requestHandler(questionSet, res);
        } catch (err) {
            console.log(err.message);
            return ResponseHelper.requestFailedResponse(err.message, res);
        }
    }


}