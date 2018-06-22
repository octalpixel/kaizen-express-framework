import { KDService } from "../../../app.core.config";
import { multipleQuestionModel } from "../../Models/QuestionManager/MultipleAnswerQusetion";

class MultipleQuestionService extends KDService{
 
    constructor(){
        super(multipleQuestionModel)
    }
    

}