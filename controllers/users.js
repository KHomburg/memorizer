const express = require("express");
const router = express.Router();
const models = require("../models")

//test route
router.get("/", (req, res) => {
  res.json({msg: "test"});
});

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


module.exports = router;