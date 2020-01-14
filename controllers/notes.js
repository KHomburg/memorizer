const express = require("express");
const router = express.Router();
const models = require("../models")
const validate = require("../helpers/validation")
const passport = require("passport");
const Sequelize = require("sequelize")
const Op = Sequelize.Op

require('dotenv').config();
const secret = process.env.SECRET


//create a new note
router.post("/new", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  if(req.body.tags != [] && req.body.tags != ""){
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
        isPublic: req.body.isPublic
      })
      if(tags){
        for (const tag of tags){
          let newTag = await models.Tag.findOrCreate({where: {name: tag}})
          tagsIds.push(newTag[0].id)
        }
        await note.setTags(tagsIds)
      }
      const newNote = await models.Note.findByPk(note.id, {include: [{model: models.Tag, as: "tags", through: {attributes:[]}}]})
      res.json(newNote)
    }
  }catch(err){
    next(err)
  }
});

//find all notes of current user
router.get("/mynotes", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  console.log(req.user)
  try{
    //TODO: limit user data sent as response
    const notes = await models.Note.findAll({
      where: {userId: req.user.id}, 
      include: [
        {model: models.User, as: "user"}, 
        {model: models.Tag, as: "tags", through: {attributes:[]}}
      ],
      order: [
        ['createdAt', 'DESC'],
      ]})
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

//find all notes
router.get("/", async (req, res, next) => {
  try{
    //TODO: limit user data sent as response
    //TODO: limit notes search to public notes or make it admin restricted
    const notes = await models.Note.findAll({
      include: [{model: models.User, as: "user"}, {model: models.Tag, as: "tags", through: {attributes:[]}}],
      order: [
        ['createdAt', 'DESC'],
      ]})
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
router.put("/:id", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try{
    const validationErrors = await validate.validateNote(req, res)
    if(validationErrors){
      return res.status(400).json({errors: validationErrors})
    }else{
      const note = await models.Note.findByPk(req.params.id, {include: [{model: models.Tag, as: "tags", through: {attributes:[]}}]})
      if(req.user.id != note.userId){
        return res.status(401).json({errors: ["Unauthorized to edit this note"]})
      }
      let tags = req.body.tags.split(",")

      if(note){
        const updatedNote = await note.update({
          title: req.body.title,
          text: req.body.text,
          content: req.body.content,
          userId: req.user.id,
          isPublic: req.body.isPublic
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
router.get("/user/:id", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try{
    const notes = await models.Note.findAll({
      where: {userId : req.params.id},
      order: [
        ['createdAt', 'DESC'],
      ]})
    res.json(notes)
  }catch(err){
    next(err)
  }
});

//delete note by user
router.delete("/:id", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try{
    const note = await models.Note.findByPk(req.params.id)
    if(note && (note.userId == req.user.id)){
      const deleted = await note.destroy()
      res.status(200).json(deleted)
    }else{
      res.status(500).json({errors: ["Note not found, or this user is not authorized to delete"]})
    }
  }catch(err){
    next(err)
  }
});

//search notes by term
router.post("/filter", async (req, res, next) => {
  const term = req.body.term
  console.log(term)
  try{
    const notes = await models.Note.searchFilter(term)
    res.status(200).json(notes)
  }catch(err){
    next(err)
  }
});

module.exports = router;