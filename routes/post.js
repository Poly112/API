var express = require("express");
var router = express.Router();
/**
 * The model folder exports db.
 * db is an object which has [All Models], sequelize and Sequelize as properties.
 * We are destructing Post and sequelize from the object "db"
 */
const { Post, User } = require("../models/index");

/* GET home page. */
router
    .route("/")
    .post(async (req, res, next) => {
        const { userUuid, body } = req.body;

        try {
            /**
       Destructuring for id  property 
       * 
       */
            const { id } = await User.findOne({
                where: { uuid: userUuid },
            });
            const post = await Post.create({ body, userId: id });
            return res.json(post);
        } catch (error) {
            next(error);
            return res.status(500).json(error);
        }
    })
    .get(async (req, res, next) => {
        try {
            const post = await Post.findAll({
                include: ["user"],
            });
            return res.json(post);
        } catch (error) {
            next(error);
            return res.status(500).json(error).status(500);
        }
    });

module.exports = router;
