"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bvns", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      bvn: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
      },

      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bvns");
  },
};
