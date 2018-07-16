import * as mongoose from "mongoose"
import * as bcrypt from "bcrypt"
import * as mongooseJoiSchemaBuilder from "mongoose-to-joi-translator"
import * as mongooseHidden from "mongoose-hidden"

export interface IAdmin extends mongoose.Document {

    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password?: string;
    avatar?: string;
    comparePassword(candidatePassword: string, storedPassword: string): Promise<boolean>
}

export const adminSchema = new mongoose.Schema({
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
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        hideJSON: true
    },
    avatar: {
        type: String,
    }
});

adminSchema.plugin(mongooseHidden())

adminSchema.pre("save", function (next) {

    let user: any = this;

    // bcrypt.genSalt(10).then(salt => {

    //     bcrypt.hash(user.password, salt)
    //         .then(hashedString => {
    //             user.password = hashedString
    //             next()
    //         })
    //         .catch(err => { console.log(err.message) })

    // })

    bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hashedString => {
            user.password = hashedString
            next()
        }).catch(err => { console.log(err.message) })





})

adminSchema.methods.comparePassword = (candidatePassword: string, storedPassword: string): Promise<boolean> => {



    return new Promise((resolve, reject) => {
        console.log(storedPassword)
        console.log(candidatePassword)
        bcrypt.compare(candidatePassword, storedPassword).then(status => {

            return resolve(status)

        }).catch(err => {
            console.log(err)
            return reject(false)
        })



    })


}

export const adminModel = mongoose.model("Admininistrator", adminSchema)
