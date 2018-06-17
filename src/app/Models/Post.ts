import { Schema, Model, model, SchemaTypes, Document } from 'mongoose';
import { ObjectID } from 'bson';
import { IUser } from "./User"
// import slugGen = require("mongoose-slug-hero")
const slugGen  =  require("mongoose-slug-hero")


export interface IPost extends Document {

    title: string
    slug: string
    body: string
    timestamp: Date
    author: IUser | ObjectID

}

const postScheme: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true
    }
});

postScheme.plugin(slugGen, { doc: "post", field: "title" })

export const postModel = model('Post', postScheme);