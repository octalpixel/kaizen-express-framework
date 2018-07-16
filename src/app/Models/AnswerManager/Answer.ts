import { Document, Schema, model, Types } from "mongoose";


export interface IAnswers extends Document {

    user_id: Types.ObjectId;
    question_id: Types.ObjectId;
    answers: [string];
    type: string;

}


export const answerSchema = new Schema({

    user_id: {
        type: Types.ObjectId,
        required: true
    },
    question_id: {
        type: Types.ObjectId,
        required: true,
    },
    //Type of Question: alias for sa-> Single Answer , ma->Multple Answer
    type: {
        type: String,
        required: true,

    },
    answers: {
        type: [String],
        required: true
    }


})


export const answerModel = model("Answer", answerSchema) 