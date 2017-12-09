const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const { User } = require('../../database/models');



module.exports = () => {
  const options = {
    secretOrKey: 'CashReactorGettinSomeMoney',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };
  
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.userId).then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
}
