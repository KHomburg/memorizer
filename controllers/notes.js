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

//find note by id
router.get("/:id", (req, res) => {
  console.log(req.params.id)
  models.Note.findByPk(req.params.id)
    .then(notes => res.json(notes))
    .catch((err) => console.log(err))
});

//find notes of user
router.get("/user/:id", (req, res) => {
  console.log(req.params.id)
  models.Note.findAll({where: {userId : req.params.id}})
    .then(notes => res.json(notes))
    .catch((err) => console.log(err))
});

module.exports = router;