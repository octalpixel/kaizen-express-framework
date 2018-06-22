import KDAuthMiddlware from "../../core/BaseMiddleware/KDMiddleware";
import { adminService } from "../Services/AdminService/AdminService";


class AdminAuthMiddleware extends KDAuthMiddlware {


    constructor() {
        super(adminService)
    }

}

export default new AdminAuthMiddleware()