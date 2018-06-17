"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_core_config_1 = require("../../app.core.config");
const User_1 = require("../Models/User");
class UserController extends app_core_config_1.KDController {
    constructor() {
        super(User_1.userModel);
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map