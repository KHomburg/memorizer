import express from "express";
const router = express.Router();
// @ts-ignore
import { Tag } from "../models";

router.get("/", async (req: any, res, next) => {
  try {
    let limit = req.query.limit ? req.query.limit : 50;
    let offset = req.query.offset ? req.query.offset : 0;
    let search = req.query.search ? req.query.search : false;
    let tags;
    if (search) {
      tags = await Tag.findAll(
        {
          where: {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
        },
        limit,
        offset
      );
    } else {
      tags = await Tag.findAll({
        offset: offset,
        limit: limit,
        order: [["createdAt", "DESC"]],
      });
    }
    if (tags) {
      res.status(200).json(tags);
    } else {
      res.status(404).json({ errors: ["Tags not found"] });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
