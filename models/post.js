"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User }) {
            // define association here
            this.belongsTo(User, { foreignKey: "userId", as: "user" });
        }

        /**
         *
         * @func toJSON() specifies, it should return all information except the id userId
         *
         * for security purposes don't disclose how many users you have in your database
         */

        toJSON() {
            return { ...this.get(), id: undefined, userId: undefined };
        }
    }
    Post.init(
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            body: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "Post must have a body" },
                    notEmpty: { msg: "Body must not be empty" },
                    /**
                     * You can create your own validation rules  by
                     *
                     * isEven (){
                     *  Function body
                     * }
                     */
                },
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: { msg: "Post must have a userId" },
                    notEmpty: { msg: "userId must not be empty" },
                    /**
                     * You can create your own validation rules  by
                     *
                     * isEven (){
                     *  Function body
                     * }
                     */
                },
            },
        },
        {
            sequelize,
            tableName: "posts",
            modelName: "Post",
        }
    );
    return Post;
};
