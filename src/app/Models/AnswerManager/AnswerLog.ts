import { Document, Schema, model, Types } from "mongoose";


export interface IAnswersLog extends Document {

    user_id: Types.ObjectId;
    answers: [Types.ObjectId];
    approved: true;


}


export const answerLogSchema = new Schema({

    user_id: {
        type: Types.ObjectId,
        required: true
    },
    answers: {
        type: [Types.ObjectId],
        required: true,
        ref: "Answer"
    },
    approved: {
        type: Boolean,
        required: true
    }


})

export const answerLogModel = model("AnswerLog", answerLogSchema);