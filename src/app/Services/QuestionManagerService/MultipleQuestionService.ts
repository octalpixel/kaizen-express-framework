import { KDService } from "../../../app.core.config";
import { multipleQuestionModel } from "../../Models/QuestionManager/MultipleAnswerQusetion";

export class MultipleQuestionService extends KDService {

    constructor() {
        super()
        super.setModel(multipleQuestionModel)
    }


}

export const multipleQuestionService = new MultipleQuestionService()