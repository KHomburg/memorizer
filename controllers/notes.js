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
      message: "note created",
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
  models.Note.findByPk(req.params.id)
    .then(notes => res.json(notes))
    .catch((err) => console.log(err))
});

//find note by id
router.put("/:id", (req, res) => {
  models.Note.findByPk(req.params.id)
    .then(note => {
      if(note){
        note.update(
          {
            title: req.body.title,
            text: req.body.text
          }
        )
        .then(note => res.json(note))
      }else{
        res.json({message: "note not found"})
      }
    })
    .catch((err) => console.log(err))
});

//find notes of user
router.get("/user/:id", (req, res) => {
  models.Note.findAll({where: {userId : req.params.id}})
    .then(notes => res.json(notes))
    .catch((err) => console.log(err))
});

//delete note by user
router.delete("/:id", (req, res) => {
  models.Note.findByPk(req.params.id)
    .then((note) => {
      if(note){
        note.destroy()
        .then(note => res.json({message: "note removed"}))
      }else{
        res.json({message: "note not found"})
      }
    })
    .catch((err) => console.log(err))
});

module.exports = router;