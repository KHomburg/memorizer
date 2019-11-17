const express = require("express");
const router = express.Router();
const models = require("../models")

require('dotenv').config();
const secret = process.env.SECRET

//test route
router.get("/test", (req, res, next) => {
  res.json({ msg: "test" });
});

//create a new note
router.post("/new", (req, res, next) => {
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
    .catch((err) => next(err))
});

//find note by id
router.get("/:id", (req, res, next) => {
  models.Note.findByPk(req.params.id)
    .then((note) => {
      if(note){
        res.json(note)
      }else{
        res.status(404).json({errors: ["Note not found"]})
      }
    })
    .catch((err) => next(err))
});

//find note by id
router.put("/:id", (req, res, next) => {
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
        .catch((err) => next(err))
      }else{
        res.status(404).json({errors: ["Note not found"]})
      }
    })
    .catch((err) => next(err))
});

//find notes of user
router.get("/user/:id", (req, res, next) => {
  models.Note.findAll({where: {userId : req.params.id}})
    .then(notes => res.json(notes))
    .catch((err) => next(err))
});

//delete note by user
router.delete("/:id", (req, res, next) => {
  models.Note.findByPk(req.params.id)
    .then((note) => {
      if(note){
        note.destroy()
        .then(note => res.json({message: "note removed"}))
      }else{
        const err = new Error("note not found")
        next(err)
      }
    })
    .catch((err) => next(err))
});

module.exports = router;