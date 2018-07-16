import * as passport from 'passport';
import { Strategy, ExtractJwt } from "passport-jwt";
import { Request, Response, NextFunction } from "express"
import KDService from '../BaseService/KDService';


export default class KDAuthMiddlware {

    private actorService: KDService
    private secretKey: string = "mithushan"
    constructor(service: KDService) {
        this.actorService = service
        this.jwtStrategy = this.jwtStrategy.bind(this)
    }

    public initialize() {
        passport.use("jwt", this.jwtStrategy())
        return passport.initialize()

    }

    public authenticate(req: Request, res: Response, next: NextFunction) {
        console.log('This is being called here')
        return passport.authenticate("jwt", { session: false }, (err, user, info) => {

            if (err) {
                console.log(err)
                return res.status(401).json({
                    success: false,
                    msg: "Error Occurred"
                })
            }

            console.log("This is the user that is being called" +  user)

            if (!user) {
                if (info.name === "TokenExpiredError") {
                    return res.status(401).json({ success: false, msg: "Your token has expired. Please generate a new one" });
                } else {
                    return res.status(401).json({ success: false, msg: info.message });
                }
            }


            return next()
        })(req, res, next)
    }

    private jwtStrategy(): Strategy {

        const params = {
            secretOrKey: this.secretKey,
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT")
        };

        console.log(params)

        return new Strategy(params, async (jwt_payload, done) => {
            console.log("Strategy is opem")
            this.actorService.getOne(jwt_payload.id).then(user => {

                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }

            }).catch(err => {
                // console.log(err.message)
                return done(err, false);
            })

        })

    }

}