const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const models = require("../models")
const config = require("../config/config")
const bcrypt = require('bcryptjs');
require('dotenv').config();
const secret = process.env.SECRET
const validate = require("../helpers/validation")

//test route
router.get("/", (req, res) => {
  res.json({ message: "this route is not defined" });
});

//register route
router.post("/register", (req, res, next) => {
  validate.validateRegistration(req, res)
  .then((validationErrors) => {
    if(validationErrors){
      res.json({errors: validationErrors}).status(500)
    }else{
      models.User.findOne({ where: { email: req.body.email } })
        .then((user) => {
          if (user) {
            const err = new Error("E-mail already in use")
            next(err)
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              if (err) next(err)
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) next(err)
                models.User.create(
                  {
                    username: req.body.username,
                    password: hash,
                    email: req.body.email.toLowerCase(),
                  }
                )
                .then(user => res.json({
                  message: "user created",
                  user
                }))
                .catch((err) => next(err))
              }, null)
            })
          }
        })
        .catch((err) => next(err))
      }
    })
    .catch((err) => next(err))
})

//login route
router.post("/login", async (req, res, next) => {
  try{
    const validationErrors =  await validate.validateLogin(req, res)
    if(validationErrors) res.json({errors: validationErrors}).status(500)

    const user = await models.User.findOne({ where: { email: req.body.email } })
    if(!user) res.json({errors: "User with this e-mail adress not found"})
    
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (isMatch) {
      const payload = {
        id: user.id,
        name: user.username
      };
      jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
          err ? next(err): res.json({token: `Bearer ${token}`})
        });
    } else {
      res.json({errors: "Wrong password"}).status(500)
    }
  }catch(error){
    return next(error)
  }
})


//find user by id route
router.get("/:id", passport.authenticate('jwt', {session: false}), (req, res, next) => {
  models.User.findByPk(req.params.id)
    .then((user) => {
      if(user){
        res.json(user)
      }else{
        const err = new Error("user not found")
        next(err)
      }
    })
    .catch((err) => next(err))
});

//find note with user model by noteId
router.get("/note/:id", passport.authenticate('jwt', {session: false}), (req, res, next) => {
  models.Note.findByPk(req.params.id, {include: [{model: models.User, as: "user"}]})
    .then((note) => {
      if(note){
        res.json(note)
      }else{
        const err = new Error("user could not be found; either note does not exist or internal error")
        next(err)
      }
    })
    .catch((err) => next(err))
});




module.exports = router;