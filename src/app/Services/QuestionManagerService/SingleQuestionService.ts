import { KDService } from "../../../app.core.config";
import { ISingleAnswerQuestion, singleQuestionModel } from "../../Models/QuestionManager/SingleAnswerQuestion"

class SingleQuestionService extends KDService {

    constructor() {
        super(singleQuestionModel)
    }

}