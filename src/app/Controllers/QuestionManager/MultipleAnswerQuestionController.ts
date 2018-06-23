import { MultipleQuestionService, multipleQuestionService } from './../../Services/QuestionManagerService/MultipleQuestionService';
import { KDController } from "../../../app.core.config";
import { multipleQuestionModel } from "../../Models/QuestionManager/MultipleAnswerQusetion";

class MultipleAnswerQuestionController extends KDController {

    private maqService: MultipleQuestionService
    constructor() {
        super(multipleQuestionModel)
        this.maqService = new MultipleQuestionService()
    }


}