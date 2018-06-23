import { KDService } from "../../../app.core.config";
import { ISingleAnswerQuestion, singleQuestionModel } from "../../Models/QuestionManager/SingleAnswerQuestion"

export class SingleQuestionService extends KDService {

    constructor() {
        super(singleQuestionModel)
    }

}

export const singleQuestionService = new SingleQuestionService()