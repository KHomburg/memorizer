const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const models = require("../models")
const config = require("../config/secret")
const bcrypt = require('bcryptjs');
require('dotenv').config();
const secret = process.env.SECRET
const validate = require("../helpers/validation")

//register route
router.post("/register", (req, res, next) => {
  validate.validateRegistration(req, res)
  .then((validationErrors) => {
    if(validationErrors){
      res.status(400).json({errors: validationErrors})
    }else{
      models.User.findOne({ where: { email: req.body.email } })
        .then((user) => {
          if (user) {
            res.status(400).json({errors: ["E-mail adress already in use"]})
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
                .then(user => {
                  user.password = "hidden"
                  res.json(user)
                })
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
    if(validationErrors) res.status(400).json({errors: validationErrors})

    const user = await models.User.findOne({ where: { email: req.body.email } })
    if(!user) res.status(400).json({errors: ["Entered E-Mail address is unknown"]})
    
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (isMatch) {
      const payload = {
        id: user.id,
        email: user.email,
        name: user.username
      };
      jwt.sign(payload, secret, /*{ expiresIn: 36000 },*/ (err, token) => {
          err ? next(err): res.json({token: `Bearer ${token}`, currentUser: payload})
        });
    } else {
      res.status(400).json({errors: ["Wrong password"]})
    }
  }catch(error){
    return next(error)
  }
})

//user authentication route for users that have a token
router.get("/auth", passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({currentUser: req.user})
})



//find user by id route
router.get("/:id", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try{
    const user = await models.User.findByPk(req.params.id, {attributes: ["id", "username", "email", "profession", "about"]})
    if(user){
      res.json(user)
    }else{
      res.status(404).json({errors: ["User not found"]})
    }
  }catch(err){
    next(err)
  }
});

//find user by id route
router.get("/", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try{
    const users = await models.User.findAll({attributes: ["id", "username", "email"]})
    if(users){
      res.json(users)
    }else{
      res.status(404).json({errors: ["No Users found"]})
    }
  }catch(err){
    next(err)
  }
});

//find note with user model by noteId
router.get("/note/:id", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try{
    const note = await models.Note.findByPk(req.params.id, {include: [{model: models.User, as: "user", attributes: ["id", "username", "email"]}]})
    if(note){
      res.json(note)
    }else{
      res.status(404).json({errors: ["Note not found"]})
    }
  }catch(err){
    next(err)
  }
});

//edit users profile route
router.put("/:id", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  var userId = req.user.id
  //if certain params provided use old one
  var newUsername = !req.body.username || req.body.username == "" ? req.user.username : req.body.username
  var newEmail = !req.body.email || req.body.email == "" ? req.user.email : req.body.email
  var newAbout = !req.body.about || req.body.about == "" ? req.user.about : req.body.about
  var newProfession = !req.body.profession || req.body.profession == "" ? req.user.profession : req.body.profession

  if(userId == req.params.id){
    try{
      const user = await models.User.findOne({ where: { id: req.user.id } })
      if(user){
        const updatedUser = await user.update({
          email: newEmail,
          username: newUsername,
          profession: newProfession,
          about: newAbout,
        })
        updatedUser.password = "hidden"
        res.json(updatedUser)

      }else{
        res.status(404).json({errors: ["User not found"]})
      }
    }catch(err){
      next(err)
    }
  }else{
    res.status(400).json({errors: ["You are not authorized to edit this users data"]})
  }
})


//delete user
router.delete("/:id", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try{
    if(!req.body.password) res.status(400).json({errors: ["You need to enter your password"]})
    if(req.params.id != req.user.id) res.status(400).json({errors: ["You are not authorized to delete this profile"]})

    const user = await models.User.findOne({ where: { email: req.user.email } })
    if(!user) res.status(400).json({errors: ["Unexpected Error: your profile was not found"]})

    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if(!isMatch) res.status(400).json({errors: ["Wrong password"]})
    
    if (isMatch) {
      const deleted = await user.destroy()
      res.status(200).json("Your profile has been deleted")
    }
  }catch(err){
    next(err)
  }
})



module.exports = router;