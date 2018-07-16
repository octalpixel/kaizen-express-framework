import { KDService } from "../../../app.core.config"
import { userModel as User, IUser } from "../../Models/User"
import { Document } from "mongoose"

export class UserService extends KDService {

    constructor() {
        super()
        super.setModel(User)
    }

    async hasUser(params: Object) {

        try {

            let hasUser = await super.getOneByCondition(params)
            return hasUser;

        } catch (err) {
            return { success: false }
        }


    }


    async createUser(user: IUser) {

        try {
            let createdUser = await super.create(user)

            if (createdUser.success) {
                createdUser.data = (<Document>createdUser.data).toJSON()
            }
            return createdUser
            
        } catch (err) {
            console.log(err.message)
            return { success: false, msg: "admin" }
        }

    }



}

export const userService = new UserService()