const express = require("express");
const router = express.Router();
const models = require("../models")
const validate = require("../helpers/validation")

require('dotenv').config();
const secret = process.env.SECRET

//create a new note
router.post("/new", async (req, res, next) => {
  try{
    const validationErrors = await validate.validateNote(req, res)
    if(validationErrors){
      res.status(400).json({errors: validationErrors})
    }else{
      const note = await models.Note.create({
        title: req.body.title,
        text: req.body.text,
        userId: req.user.id,
      })
      res.json({
        message: "Note created",
        note
      })
    }
  }catch(err){
    next(err)
  }
});

//find note by id
router.get("/:id", async (req, res, next) => {
  try{
    const note = await models.Note.findByPk(req.params.id)
    if(note){
      res.json(note)
    }else{
      res.status(404).json({errors: ["Note not found"]})
    }
  }catch(err){
    next(err)
  }
});

//update note
router.put("/:id", async (req, res, next) => {
  try{
    const validationErrors = await validate.validateNote(req, res)
    if(validationErrors){
      res.status(400).json({errors: validationErrors})
    }else{
      const note = await models.Note.findByPk(req.params.id)
      if(note){
        const updatedNote = await note.update({
          title: req.body.title,
          text: req.body.text
        })
        res.json(updatedNote)
      }else{
        res.status(404).json({errors: ["Note not found"]})
      }
    }
  }catch(err){
    next(err)
  }
});

//find notes of user
router.get("/user/:id", async (req, res, next) => {
  try{
    const notes = await models.Note.findAll({where: {userId : req.params.id}})
    res.json(notes)
  }catch(err){
    next(err)
  }
});

//delete note by user
router.delete("/:id", async (req, res, next) => {
  try{
    const note = await models.Note.findByPk(req.params.id)
    if(note){
      note.destroy()
      .then(note => res.json({message: "note removed"}))
    }else{
      res.status(404).json({errors: ["Note not found"]})
    }
  }catch(err){
    next(err)
  }
});

module.exports = router;