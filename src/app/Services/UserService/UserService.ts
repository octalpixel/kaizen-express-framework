import { KDService } from "../../../app.core.config"
import { userModel as User, IAdmin } from "../../Models/User"
import { Document } from "mongoose"

export class AdminService extends KDService {

    constructor() {
        super(User)
    }

    async hasUser(params: Object) {

        try {

            let hasUser = await super.getOneByCondition(params)
            return hasUser;

        } catch (err) {
            return { success: false }
        }


    }


    async createUser(user: IAdmin) {

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

export const userService = new AdminService()