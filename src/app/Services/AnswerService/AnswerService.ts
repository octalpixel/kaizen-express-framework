import { KDService } from "../../../app.core.config";
import { answerModel as Answer, IAnswers } from '../../Models/AnswerManager/Answer'


export class AnswerService extends KDService {

    constructor() {
        super()
        super.setModel(Answer)
    }

}