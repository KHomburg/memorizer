import express from "express";
const router = express.Router();

//test route
router.get("/", (req, res) => {
  res.render("test");
});

module.exports = router;