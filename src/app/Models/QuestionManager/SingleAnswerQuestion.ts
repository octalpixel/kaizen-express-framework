import { Document, Schema, model } from "mongoose"

/**
 * Single Question 
 * Fields
 * -id:objectId
 * -question:string
 * -timestamp:date
 * -admin_id
 *  
 */

export interface ISingleAnswerQuestion extends Document {
    // _id: Schema.Types.ObjectId,
    question: string,
    admin_id: string,
    created_at: Date,
    updated_at: Date

}

const singleQuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },

    admin_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref:'Admininistrator'
    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })


export const singleQuestionModel = model('QMSingleQuestion', singleQuestionSchema)