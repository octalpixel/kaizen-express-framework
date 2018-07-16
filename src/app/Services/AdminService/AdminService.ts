import { KDService } from "../../../app.core.config"
import { adminModel as User, IAdmin } from "../../Models/Admin"
import { Document } from "mongoose"

export class AdminService extends KDService {

    constructor() {
        super()
        this.setModel(User)
    }

    async hasAdmin(params: Object) {

        try {

            let hasUser = await super.getOneByCondition(params)
            return hasUser;

        } catch (err) {
            return { success: false }
        }


    }


    async createAdmin(user: IAdmin) {

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