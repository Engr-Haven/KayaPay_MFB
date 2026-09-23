"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("nins", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      nin: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
      },

      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false,
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
    await queryInterface.dropTable("nins");
  },
};
