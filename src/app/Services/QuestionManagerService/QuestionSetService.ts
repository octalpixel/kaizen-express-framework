import { Types, Schema } from 'mongoose';
import { KDService } from "../../../app.core.config";
import { IQuestionSet, questionSetSchema, questionSetModel, IQuestionList } from "../../Models/QuestionManager/QuestionSet"
import { ISingleAnswerQuestion, singleQuestionModel } from '../../Models/QuestionManager/SingleAnswerQuestion'
import ResponseHelper from "../../../core/Helpers/ResponseHelper"
import { runInThisContext } from 'vm';
import KDIResponseData from '../../../core/BaseInterface/KDIResponseData';

//Created Questions and Question Set



export class QuestionSetService extends KDService {

    constructor() {
        super()
        this.setModel(questionSetModel)
    }

    //Passes the object id and the new question
    private async addToQuestionList(questionSet_id: Types.ObjectId, newQuestionObject: IQuestionList) {
        let returnMessage:KDIResponseData;
        try {

            let questionSet = (await questionSetModel.findById(questionSet_id)) as IQuestionSet
            if (questionSet != null) {
                // console.log("Entered")

                try {
                    if (questionSet.questionList.includes(newQuestionObject)) {
                        return returnMessage = {success:false,msg:'Question Already Exists'}
                    }
                    questionSet.questionList.push(newQuestionObject)
                    // questionSet.questionList.push({ type: "d", question_id: "5b43bdd63e3d2e643c448283" })
                    // console.log(questionSet)
                    let data = await questionSet.save()
                    // let updateData = await questionSetModel.findByIdAndUpdate(questionSet_id, { $push: { questionList: newQuestionObject } }, { new: true, upsert: true })
                    //  let data = await questionSetModel.updateOne({ _id: questionSet_id },{ $push: { questionList: newQuestionObject }}).exec()
                    // console.log(data)

                    return returnMessage = {success:true,msg:'Question Added'}
                } catch (error) {
                    return returnMessage = {success:false,msg:error.message}
                }

            } else {
                //Return Error
                console.log("Failed to get by id")
                return returnMessage = {success:false,msg:'Failed to get ID'};
            }
        } catch (error) {
            console.log(error.message)
            return returnMessage = {success:false,msg:error.message}
        }
    }

    async getAllQuestionSet() {
        try {
            let questionSets = await questionSetModel.find().populate('admin_id', '-email');
            return ResponseHelper.serviceSuccessResponse(questionSets)
        } catch (err) {
            console.log(err.message)
            return ResponseHelper.serviceFailedResponse("Unable to get Question Sets");
        }
    }

    async getQuestionSetById(questionSet_id: Schema.Types.ObjectId) {
        try {
            let questionSet = await this.getOne(questionSet_id);
            return questionSet;

        } catch (err) {
            console.log(err.message)
            return ResponseHelper.serviceFailedResponse("Unable to get Question Sets By Id");
        }
    }

    async createQuestionSet(questionSetData: IQuestionSet) {
        this.setModel(questionSetModel)
        // Create Quetion Set
        try {
            let questionSet = await this.create(questionSetData)
            return questionSet;
        } catch (err) {
            return ResponseHelper.serviceFailedResponse(err.message)
        }
    }


    async updateQuestionList(questionSet_id: Types.ObjectId, question: IQuestionList) {
        this.setModel(questionSetModel)
        try {
            let updatedQuestionStatus = await this.addToQuestionList(questionSet_id, question)

            if (updatedQuestionStatus.success) {
                return ResponseHelper.serviceSuccessResponse("Updated Question List")
            } else {
                return ResponseHelper.serviceFailedResponse(updatedQuestionStatus.msg)
            }


        } catch (err) {
            return ResponseHelper.serviceFailedResponse("Unable to update Question List");
        }
    }


}