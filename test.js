const mongoose = require("mongoose")
const joiBuilder = require("mongoose-to-joi-translator")
const joi = require("joi")


const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        // unique: true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    }
});


let joiSchema = joiBuilder(schema);

let confirmation = {
    "first_name": "Mithtushan",
    "last_name": "Jalangan",
    "username":"mithushanj",
    "email":"m",
    "password":"df"

}


async function validate() {
    try {
        let status = await joi.validate(confirmation, joiSchema)
        console.log(status)
    } catch (err) {
        //console.log(err)
        console.log(err.message)
    }
}

validate()