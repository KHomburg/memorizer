const express = require("express");
const router = express.Router();
const models = require("../models")

require('dotenv').config();
const secret = process.env.SECRET

//test route
router.get("/test", (req, res) => {
  
  res.json({ msg: "test" });

});

//create a new note
router.post("/new", (req, res) => {
  //TODO: add input validation
  models.Note.create(
    {
      title: req.body.title,
      text: req.body.text,
      userId: req.user.id,
    })
    .then(note => res.json({
      msg: "note created",
      note
    }))
    .catch((err) => {
      if(err){
        res.json(err)
        if (err) throw err
      }
    })
});

module.exports = router;