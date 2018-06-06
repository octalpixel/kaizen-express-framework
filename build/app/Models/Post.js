"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postScheme = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});
exports.default = mongoose_1.model('postModel', postScheme);
//# sourceMappingURL=Post.js.map