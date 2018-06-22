import { Document, model, Schema } from "mongoose"
/**
 * Multiple Question and Answer Model
 * This document is used to create questions with multiple answers more sort of MCQ
 */
export interface IMultipleQA extends Document {

    question: string,
    answers: Array<string>,
    correct_answers: string,
    admin_id: Schema.Types.ObjectId,
    created_at: Date,
    update_at: Date
}

const multipleQAScheme = new Schema({

    question: {
        type: String,
        required: true
    },
    answers: {
        type: [String],
        required: true
    },
    correct_answers: {
        type: String,
        required: true
    },
    admin_id: {
        type: Schema.Types.ObjectId,
        ref: "Admin"
    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })


export const multipleQuestionModel = model('QMMultipleQuestion', multipleQAScheme)