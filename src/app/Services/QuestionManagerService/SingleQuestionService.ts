import { KDService } from "../../../app.core.config";
import { ISingleQuestion, singleQuestionModel } from "../../Models/QuestionManager/SingleAnswerQuestion"

class SingleQuestionService extends KDService {

    constructor() {
        super(singleQuestionModel)
    }

}