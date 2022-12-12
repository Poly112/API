var express = require("express");
var router = express.Router();

/**
 * The model folder exports db.
 * db is an object which has [All Models], sequelize and Sequelize as properties.
 * We are destructing User and sequelize from the object "db"
 */
const { User } = require("../models/index");

/* POST users listing. */
router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (error) {
            next(error);
            return res.status(500).json(error);
        }
    })
    .post(async (req, res, next) => {
        const { name, email, role } = req.body;

        try {
            const user = await User.create({ name, email, role });
            return res.json(user);
        } catch (error) {
            next(error);
            return res.status(500).json(error);
        }
    });

router
    .route("/:uuid")
    .get(async (req, res, next) => {
        const { uuid } = req.params;

        try {
            const user = await User.findOne({
                where: { uuid },
                include: ["post"],
            });
            console.log();

            return res.json(user);
        } catch (error) {
            next(error);
            return res.status(500).json(error);
        }
    })
    .delete(async (req, res, next) => {
        const { uuid } = req.params;

        try {
            const user = await User.findOne({ where: { uuid } });

            user.destroy();

            return res.json({ message: "User deleted" });
        } catch (error) {
            next(error);
            return res.status(500).json(error);
        }
    })
    .put(async (req, res, next) => {
        const { uuid } = req.params;
        const { name, email, role } = req.body;

        try {
            const user = await User.findOne({ where: { uuid } });

            user.name = name;
            user.email = email;
            user.role = role;

            user.save();

            return res.json(user);
        } catch (error) {
            next(error);
            return res.status(500).json(error);
        }
    });

module.exports = router;
