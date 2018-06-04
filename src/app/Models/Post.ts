import {Schema, Model, model} from 'mongoose';

const postScheme:Schema = new Schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    body:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now,
    }
});

export default model('postModel', postScheme);