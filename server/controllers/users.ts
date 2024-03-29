import express from "express";
const router = express.Router();
import passport from "passport";
import jwt from "jsonwebtoken";
// @ts-ignore
import models from "../models";
// const config = "../config/secret"
import bcrypt from "bcryptjs";
require("dotenv").config();
const secret = process.env.SECRET;
import { validate } from "../helpers/validation";
import { mailer } from "../helpers/mailer";

//register route
router.post("/register", async (req: any, res, next) => {
  const validationErrors = await validate.validateRegistration(req, res);

  if (validationErrors) {
    res.status(400).json({ errors: validationErrors });
  } else {
    const user = await models.User.findOne({
      where: { email: req.body.email },
    });

    if (user) {
      res.status(400).json({ errors: ["E-mail adress already in use"] });
    } else {
      bcrypt.genSalt(10, async (err, salt) => {
        if (err) next(err);
        bcrypt.hash(
          req.body.password,
          salt,
          async (err, hash) => {
            if (err) next(err);
            const newUser = await models.User.create({
              username: req.body.username,
              password: hash,
              email: req.body.email.toLowerCase(),
            });

            newUser.password = "hidden";
            res.json(newUser);
          },
          null
        );
      });
    }
  }
});

//login route
router.post("/login", async (req: any, res, next) => {
  try {
    const validationErrors = await validate.validateLogin(req, res);
    if (validationErrors) res.status(400).json({ errors: validationErrors });

    const user = await models.User.findOne({
      where: { email: req.body.email },
    });
    if (!user)
      res.status(400).json({ errors: ["Entered E-Mail address is unknown"] });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      const payload = {
        id: user.id,
        email: user.email,
        name: user.username,
      };
      jwt.sign(
        payload,
        secret,
        /*{ expiresIn: 36000 },*/ (err, token) => {
          err
            ? next(err)
            : res.json({ token: `Bearer ${token}`, currentUser: payload });
        }
      );
    } else {
      res.status(400).json({ errors: ["Wrong password"] });
    }
  } catch (error) {
    return next(error);
  }
});

//user authentication route for users that have a token
router.get(
  "/auth",
  passport.authenticate("jwt", { session: false }),
  (req: any, res, next) => {
    res.json({ currentUser: req.user });
  }
);

//find user by id route
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: any, res, next) => {
    try {
      const user = await models.User.findByPk(req.params.id, {
        attributes: ["id", "username", "email", "profession", "about"],
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ errors: ["User not found"] });
      }
    } catch (err) {
      next(err);
    }
  }
);

//find user by id route
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: any, res, next) => {
    try {
      const users = await models.User.findAll({
        attributes: ["id", "username", "email"],
      });
      if (users) {
        res.json(users);
      } else {
        res.status(404).json({ errors: ["No Users found"] });
      }
    } catch (err) {
      next(err);
    }
  }
);

//find note with user model by noteId
router.get(
  "/note/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: any, res, next) => {
    try {
      const note = await models.Note.findByPk(req.params.id, {
        include: [
          {
            model: models.User,
            as: "user",
            attributes: ["id", "username", "email"],
          },
        ],
      });
      if (note) {
        res.json(note);
      } else {
        res.status(404).json({ errors: ["Note not found"] });
      }
    } catch (err) {
      next(err);
    }
  }
);

//edit users credentials
router.put(
  "/:id/credentials",
  passport.authenticate("jwt", { session: false }),
  async (req: any, res, next) => {
    try {
      const validateError = await validate.validateCredentialUpdate(req, res);
      if (validateError) {
        res.status(400).json({ errors: validateError });
      }

      //check if valid password is provided, and user to be change is same as logged in
      if (!req.body.oldpassword)
        return res
          .status(401)
          .json({ errors: ["You need to enter your current password"] });
      if (req.params.id != req.user.id)
        return res
          .status(401)
          .json({ errors: ["You are not authorized to edit this profile"] });

      //find user

      const user = await models.User.findOne({
        where: { email: req.user.email },
      });
      if (!user)
        return res
          .status(404)
          .json({ errors: ["Unexpected Error: your profile was not found"] });

      //check if passwords match
      const isMatch = await bcrypt.compare(req.body.oldpassword, user.password);
      if (!isMatch)
        return res.status(401).json({ errors: ["Wrong current password"] });

      //check if new email is unique
      if (req.user.email != req.body.newemail) {
        const checkUniqueEmail = await models.User.findOne({
          where: { email: req.body.newemail },
        });
        if (checkUniqueEmail)
          return res.status(401).json({ errors: ["Email is already in use"] });
      }
      var newPassword =
        !req.body.newpassword || req.body.newpassword == ""
          ? false
          : req.body.newpassword;
      var newEmail =
        !req.body.newemail || req.body.newemail == ""
          ? false
          : req.body.newemail;

      if (isMatch) {
        //update password and mail
        if (newPassword) {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) next(err);
            bcrypt.hash(
              newPassword,
              salt,
              async (err, hash) => {
                if (err) next(err);
                try {
                  user.email = newEmail ? newEmail : user.email;
                  user.password = hash;
                  const updatedUser = await user.save();
                  res.status(200).json("User credentials successfully updated");
                } catch (err) {
                  next(err);
                }
              },
              null
            );
          });
        } else if (newEmail) {
          //update only mail
          try {
            user.email = newEmail;
            const updatedUser = await user.save();
            res.status(200).json("User credentials successfully updated");
          } catch (err) {
            next(err);
          }
        }
      }
    } catch (err) {
      next(err);
    }
  }
);

//edit users profile route
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: any, res, next) => {
    var userId = req.user.id;
    //if certain params provided use old one
    var newUsername =
      !req.body.username || req.body.username == ""
        ? req.user.username
        : req.body.username;
    var newAbout =
      !req.body.about || req.body.about == "" ? req.user.about : req.body.about;
    var newProfession =
      !req.body.profession || req.body.profession == ""
        ? req.user.profession
        : req.body.profession;

    if (userId == req.params.id) {
      try {
        const user = await models.User.findOne({ where: { id: req.user.id } });
        if (user) {
          const updatedUser = await user.update({
            username: newUsername,
            profession: newProfession,
            about: newAbout,
          });
          updatedUser.password = "hidden";
          res.json(updatedUser);
        } else {
          res.status(404).json({ errors: ["User not found"] });
        }
      } catch (err) {
        next(err);
      }
    } else {
      res
        .status(400)
        .json({ errors: ["You are not authorized to edit this users data"] });
    }
  }
);

//delete user
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req: any, res, next) => {
    try {
      if (!req.body.password)
        return res
          .status(401)
          .json({ errors: ["You need to enter your password"] });
      if (req.params.id != req.user.id)
        return res
          .status(401)
          .json({ errors: ["You are not authorized to delete this profile"] });

      const user = await models.User.findOne({
        where: { email: req.user.email },
      });
      if (!user)
        return res
          .status(404)
          .json({ errors: ["Unexpected Error: your profile was not found"] });

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) return res.status(401).json({ errors: ["Wrong password"] });

      if (isMatch) {
        const deleted = await user.destroy();
        res.status(200).json("Your profile has been deleted");
      }
    } catch (err) {
      next(err);
    }
  }
);

//TODO: creste "resetcredentials route"
//send new password for forgotten password request
router.post("/passwordreset", async (req: any, res, next) => {
  try {
    //get user
    const email = req.body.email;
    const user = await models.User.findOne({ where: { email: email } });
    if (user) {
      //create new password
      const newPW = Math.random().toString(36).substring(3);

      //hash new password, save it to user and send mail
      bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(
          newPW,
          salt,
          async (err, hash) => {
            if (err) next(err);
            try {
              user.password = hash;
              const updatedUser = await user.save();
              //send mail with password
              mailer.passwordResetMail(user, newPW);
              res
                .status(200)
                .json("New password has been sent to provided E-Mail adress");
            } catch (err) {
              next(err);
            }
          },
          null
        );
      });
    } else {
      res
        .status(404)
        .json({ errors: ["User with that E-Mail adress not found"] });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
