const express = require("express");
const router = express.Router();
const models = require("../models")
const validate = require("../helpers/validation")
const Sequelize = require("sequelize")
const Op = Sequelize.Op

require('dotenv').config();
const secret = process.env.SECRET

//create a new note
router.post("/new", async (req, res, next) => {
  if(req.body.tags){
    var tags = req.body.tags.split(",")
    var tagsIds = []
  }
  try{
    const validationErrors = await validate.validateNote(req, res)
    if(validationErrors){
      res.status(400).json({errors: validationErrors})
    }else{
      const note = await models.Note.create({
        title: req.body.title,
        text: req.body.text,
        content: req.body.content,
        userId: req.user.id,
      })
      if(tags){
        for (const tag of tags){
          let newTag = await models.Tag.findOrCreate({where: {name: tag}})
          tagsIds.push(newTag[0].id)
        }
        await note.setTags(tagsIds)
      }
      const newNote = await models.Note.findByPk(note.id, {include: [{model: models.Tag, as: "tags", through: {attributes:[]}}]})
      res.json({
        message: "Note created",
        newNote
      })
    }
  }catch(err){
    next(err)
  }
});

//find all notes of current user
router.get("/mynotes", async (req, res, next) => {
  console.log(req.user)
  try{
    const notes = await models.Note.findAll({where: {userId: req.user.id}, include: [{model: models.User, as: "user"}, {model: models.Tag, as: "tags", through: {attributes:[]}}]})
    if(notes){
      res.json(notes)
    }else{
      res.status(404).json({errors: ["Notes not found"]})
    }
  }catch(err){
    next(err)
  }
});

//find note by id
router.get("/:id", async (req, res, next) => {
  try{
    const note = await models.Note.findOne({where: {id: req.params.id}, include:[{model: models.Tag, as: "tags", through: {attributes:[]}}]})
    if(note){
      res.json(note)
    }else{
      res.status(404).json({errors: ["Note not found"]})
    }
  }catch(err){
    next(err)
  }
});

//find all notes by id
router.get("/", async (req, res, next) => {
  try{
    const notes = await models.Note.findAll({include: [{model: models.User, as: "user"}, {model: models.Tag, as: "tags", through: {attributes:[]}}]})
    if(notes){
      res.json(notes)
    }else{
      res.status(404).json({errors: ["Notes not found"]})
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
      const note = await models.Note.findByPk(req.params.id, {include: [{model: models.Tag, as: "tags", through: {attributes:[]}}]})
      let tags = req.body.tags.split(",")

      if(note){
        const updatedNote = await note.update({
          title: req.body.title,
          text: req.body.text,
          content: req.body.content,
          userId: req.user.id,
        })

        let tagsIds = []
        if(tags){
          for (const tag of tags){
            let newTag = await models.Tag.findOrCreate({where: {name: tag}})
            tagsIds.push(newTag[0].id)
          }
          await note.setTags(tagsIds)
        }
        const changedNote = await models.Note.findByPk(req.params.id, {include: [{model: models.Tag, as: "tags", through: {attributes:[]}}]})
        res.json(changedNote)

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