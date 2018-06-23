import { KDController } from "../../../app.core.config";
import { singleQuestionModel } from "../../Models/QuestionManager/SingleAnswerQuestion";
import { SingleQuestionService } from "../../Services/QuestionManagerService/SingleQuestionService";

class SingleAnswerQuestionController extends KDController {


    private saqService: SingleQuestionService
    constructor() {
        super(singleQuestionModel)
        this.saqService = new SingleQuestionService()

    }


}