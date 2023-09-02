const passport = require("passport");

module.exports.getUser = (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    req.user = user
    return next(err)
  })
  (req, res, next)
}
