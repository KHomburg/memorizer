const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const models = require("../models")
const config = require("../config/config")
const bcrypt = require('bcryptjs');

//test route
router.get("/", (req, res) => {
  res.json({msg: "test"});
});

//register route
router.post("/register", (req, res) => {
  models.User.findOne({where: {email: req.body.email}})
    .then((user) => {
      if(user){
        res.json({
          msg: "user already exists",
          user
        })
      }else{
        bcrypt.genSalt(10, (err, salt) => {
          if(err) throw err
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            //TODO: include validation
            //TODO: refactor: outsource to a helper
            if(err) throw err
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
              res.json({error: err})
              if(err) throw err
            })
          }, null)
        })
      }
    })
})

//login route
router.post("/login", (req, res) => {
  models.User.create(
    {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    }
  )
  .then(user => res.json(user))
  .catch((err) => console.log(err))
  
});

//login route
router.get("/:id", (req, res) => {
  models.User.findByPk(req.params.id)
    .then(user => res.json(user))
    .catch((err) => console.log(err))
    
  });


module.exports = router;