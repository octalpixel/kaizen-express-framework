import * as passport from 'passport';
import { Strategy, ExtractJwt } from "passport-jwt";
import { userService } from '../Services/UserService'
import { Request, Response, NextFunction } from "express"


class AuthMiddlware {


    initialize() {
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

            console.log(user)

            if (!user) {
                if (info.name === "TokenExpiredError") {
                    return res.status(401).json({ success:false,msg: "Your token has expired. Please generate a new one" });
                } else {
                    return res.status(401).json({ success:false , msg: info.message });
                }
            }

            
            return next()
        })(req, res, next)
    }
 
    private jwtStrategy(): Strategy {

        const params = {
            secretOrKey: "mithushan",
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT")
        };

        return new Strategy(params, async (jwt_payload, done) => {
            console.log("Strategy is opem")
            userService.getOne(jwt_payload.id).then(user => {

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



export default new AuthMiddlware()