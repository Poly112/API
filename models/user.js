"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Post }) {
            // define association here
            this.hasMany(Post, { foreignKey: "userId", as: "post" });
        }

        /**
         *
         * @func toJSON() specifies, it should return all information except the id
         *
         * for security purposes don't disclose how many users you have in your database
         */

        toJSON() {
            return { ...this.get(), id: undefined };
        }
    }
    User.init(
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "User must have a name" },
                    notEmpty: { msg: "Name must not be empty" },
                    /**
                     * You can create your own validation rules  by
                     *
                     * isEven (){
                     *  Function body
                     * }
                     */
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: { msg: "Must be a valid email address" },

                    /**
                     * You can create your own validation rules  by
                     *
                     * isEven (){
                     *  Function body
                     * }
                     */
                },
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "User must have a role" },
                    notEmpty: { msg: "Role must not be empty" },
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
            tableName: "users",
            modelName: "User",
        }
    );
    return User;
};
