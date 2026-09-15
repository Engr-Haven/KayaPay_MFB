const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/databaseConfig");

const BVN = sequelize.define(
  "BVN",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    bvn: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [11, 11],
      },
    },

    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "bvns",
    timestamps: true,
  },
);

module.exports = BVN;
