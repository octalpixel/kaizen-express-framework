"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
exports.userSchema = new mongoose.Schema({
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
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    }
});
exports.userSchema.pre("save", function (next) {
    let user = this;
    bcrypt.hash(user.password, 10)
        .then(hashedString => {
        console.log(this.password);
        console.log(hashedString);
        this.password = hashedString;
        console.log("---");
        console.log(this.password);
    })
        .catch(err => { console.log(err.message); });
    next();
});
exports.userSchema.methods.comparePassword = (candidatePassword) => {
    let password = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password).then(status => {
            return resolve(status);
        }).catch(err => {
            console.log(err);
            return reject(false);
        });
    });
};
exports.userModel = mongoose.model("User", exports.userSchema);
//# sourceMappingURL=User.js.map