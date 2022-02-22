const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require('passport')
require("dotenv").config();

const init = () => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: process.env.SECRET_OR_KEY

    };
    passport.use(
        new JwtStrategy(opts, (decoded, done) => {
            return done(null, decoded);
        })
    );
};
const protectWithJwt = (req, res, next) => {
    if(req.path == '/' || req.path == '/auth/login' || req.path == '/auth/signin' || req.path == '/doc'){
        return next()
    }
    return passport.authenticate('jwt', {session: false})(req, res, next)
}
exports.init = init;
exports.protectWithJwt = protectWithJwt