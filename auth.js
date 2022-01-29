const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

module.exports = (passport) => {
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
