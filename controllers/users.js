const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const models = require("../models")
const config = require("../config/config")
const bcrypt = require('bcryptjs');
require('dotenv').config();
const secret = process.env.SECRET

const errors = {}

//test route
router.get("/", (req, res) => {
  res.json({ msg: "test" });
});

//register route
router.post("/register", (req, res) => {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        res.json({
          msg: "user already exists",
          user
        })
      } else {
        if(req.body.password === req.body.password2){
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              //TODO: include validation
              if (err) throw err
              models.User.create(
                {
                  username: req.body.username,
                  password: hash,
                  email: req.body.email.toLowerCase(),
                }
              )
              .then(user => res.json({
                msg: "user created",
                user
              }))
              .catch((err) => {
                res.json({ error: err })
                if (err) throw err
              })
            }, null)
          
          })
        }else{
          errors.password = "Passwords do not match";
          return res.status(404).json(errors);
        }
      }
    })
})

//login route
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        errors.email = "Email not found";
        return res.status(404).json(errors);
      }
      //TODO: include validation
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.username
            };
            jwt.sign(payload, secret, { expiresIn: 36000 },
              (err, token) => {
                if (err) res.status(500)
                  .json({
                    error: "Error signing token",
                    raw: err
                  });
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              });
          } else {
              errors.email = "Password does not match";
              return res.status(404).json(errors);
          }
        })
        .catch((err) => console.log(err))
    });
})

//login route
router.get("/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
  models.User.findByPk(req.params.id)
    .then(user => res.json(user))
    .catch((err) => console.log(err))
});


module.exports = router;