import { KDController } from "../../app.core.config"
import { IUser, userModel, userSchema } from "../Models/User"
import { Request, Response, NextFunction } from "express"
import { UserService } from "../Services/UserService"
import ResponseHelper from "../../core/Helpers/ResponseHelper"
import * as jwt from 'jsonwebtoken';
import * as moment from "moment";





export default class UserController extends KDController {

    userService: UserService
    constructor() {
        super(userModel)
        this.userService = new UserService()
        this.login = this.login.bind(this)
        this.getToken = this.getToken.bind(this)
        this.register = this.register.bind(this)
    }

    private getToken(user: IUser): string | null {

        try {
            let expireDate = moment().utc().add({ days: 7 }).unix()
            let token = jwt.sign({
                exp: expireDate,
                payload: user
            }, "mithushan")

            return token;

        } catch (ex) {

            return null;
        }

    }


    async protectedRoute(req: Request, res: Response, next: NextFunction) {

        let isToken = super.getAuthToken(req)

        res.send("This is protected" + isToken)

    }

    async login(req: Request, res: Response, next: NextFunction) {


        // Check for the username and passwork
        // If both match then generate token
        // if not throw an error

        try {
            let loginDetails: IUser = req.body;
            let { username, password } = loginDetails
            let hasUser = await this.userService.hasUser({ username })
            console.log(hasUser)

            if ((hasUser.success && hasUser.data != null)) {

                let user = hasUser.data as IUser
                let correctPassword = await user.comparePassword(password, user.password)

                if (correctPassword) {

                    let [id, token] = [user.id, this.getToken(user.toJSON())]

                    if (token) {

                        let responseData = {
                            success: true,
                            data: { id, username, token }
                        }

                        return ResponseHelper.requestHandler(responseData, res)

                    } else {

                        return ResponseHelper.internalErrorResponse(res)

                    }



                } else {
                    return ResponseHelper.requestFailedResponse("Invalid Credentials", res, 400)
                }


            } else {
                return ResponseHelper.requestFailedResponse("Invalid Credentials", res, 400)
                // console.log('This is happening')
            }

        } catch (ex) {
            console.log("Error")
            res.send(ex.message)
        }


    }


    async register(req: Request, res: Response, next: NextFunction) {


        try {

            let registerDetails: IUser = req.body
            //Validation comes here 

            //Check if user already exists
            let { username, email } = registerDetails
            let usernameExist = await this.userService.hasUser({ username })

            if (usernameExist.success) {
                return ResponseHelper.requestFailedResponse("Username already exists", res, 400)
            }

            let emailExists = await this.userService.hasUser({ email })

            if (emailExists.success) {
                return ResponseHelper.requestFailedResponse("Email already in use", res, 400)
            }

            let newUser = await this.userService.createUser(registerDetails)

            return ResponseHelper.requestHandler(newUser, res)

        } catch (ex) {
            console.log(ex)
            return res.send(ex.message)
        }

    }




}