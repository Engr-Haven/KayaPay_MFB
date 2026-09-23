const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/databaseConfig");

const NIN = sequelize.define(
  "NIN",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    nin: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [11, 11],
      },
    },

    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        is: /^[A-Za-z]{2,50}$/,
        notEmpty: true,
      },
    },

    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        is: /^[A-Za-z]{2,50}$/,
        notEmpty: true,
      },
    },

    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "nins",
    timestamps: true,
  },
);

module.exports = NIN;
