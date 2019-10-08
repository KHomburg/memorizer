const pp_jwt = require('passport-jwt');
const Strategy = pp_jwt.Strategy;
const ExtractJwt = pp_jwt.ExtractJwt;


require('dotenv').config();
const secret = process.env.SECRET || 'some other secret as default';
const models = require("../models")

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

module.exports = passport => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      models.User.findOne({where: {id: payload.id}})
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              name: user.name,
              email: user.email,
            });
          }
          return done(null, false);
        })
        .catch(err => console.error(err));
    })
  )
};