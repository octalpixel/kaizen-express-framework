import { Document, model, Schema, Types } from "mongoose"


export interface IQuestionList {

    type: string;
    question_id: string

}

export interface IQuestionSet extends Document {

    admin_id: string,
    created_at?: Date;
    updated_at?: Date;
    title: string;
    questionList: [Object]

}


export const questionSetSchema = new Schema({

    admin_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref:'Admininistrator'
    },
    title: {
        type: String,
        required: true
    },
    questionList: {
        type: Array,
        default: []
    }

},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
)

export const questionSetModel = model('QuestionSet', questionSetSchema)