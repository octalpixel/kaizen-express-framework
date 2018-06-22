import { KDController } from "../../../app.core.config";
import { singleQuestionModel } from "../../Models/QuestionManager/SingleAnswerQuestion";

class QuestionManagerController extends KDController {


    constructor(){
        super(singleQuestionModel)
    }
    

}