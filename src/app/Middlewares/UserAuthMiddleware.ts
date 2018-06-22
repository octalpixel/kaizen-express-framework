import { userService } from '../Services/UserService/UserService'
import KDAuthMiddlware from '../../core/BaseMiddleware/KDMiddleware';


class UserAuthMiddlware extends KDAuthMiddlware {


    constructor() {
        super(userService)
    }

}



export default new UserAuthMiddlware()