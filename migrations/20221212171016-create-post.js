"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * Original parameters were
     * @param queryInterface
     * @param Sequelize
     *
     * But I changed it to
     * @param queryInterface
     * @param DataTypes
     *
     * to enable me copy and paste from Models without breaking anything
     *
     */
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable("posts", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            body: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        });
    },
    async down(queryInterface, DataTypes) {
        await queryInterface.dropTable("posts");
    },
};
