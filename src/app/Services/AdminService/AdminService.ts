import { KDService } from "../../../app.core.config"
import { userModel as User, IUser } from "../../Models/User"
import { Document } from "mongoose"

export class AdminService extends KDService {

    constructor() {
        super(User)
    }

    async hasAdmin(params: Object) {

        try {

            let hasUser = await super.getOneByCondition(params)
            return hasUser;

        } catch (err) {
            return { success: false }
        }


    }


    async createAdmin(user: IUser) {

        try {
            let createdUser = await super.create(user)

            if (createdUser.success) {
                createdUser.data = (<Document>createdUser.data).toJSON()
            }
            return createdUser
            
        } catch (err) {
            console.log(err.message)
            return { success: false, msg: "Failed to create admin" }
        }

    }



}

export const adminService = new AdminService()