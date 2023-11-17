"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Developer extends Model {
    static associate(models) {
      // define association here
    }
  }
  Developer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        validate: {
          isInt: {
            args: true,
            msg: "devId must be an integer",
          },
          notNull: {
            args: true,
            msg: "devId must not be null",
          },
        },
      },
      firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "firstName must not be an empty string",
          },
          notNull: {
            args: true,
            msg: "firstName is required",
          },
          len: {
            args: [1, 30],
            msg: "firstName must be between 1 and 30 characters",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "lastName must not be an empty string",
          },
          notNull: {
            args: true,
            msg: "lastName is required",
          },
          len: {
            args: [1, 30],
            msg: "lastName must be between 1 and 30 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
          args: true,
          msg: "Email must be unique",
        },
        validate: {
          isEmail: {
            args: true,
            msg: "Please enter a valid email address",
          },
          notNull: {
            args: true,
            msg: "email must not be empty",
          },
        },
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female"),
        allowNull: true,
        defaultValue: "Male",
        validate: {
          isIn: {
            args: [["Male", "Female"]],
            msg: "Invalid Gender",
          },
        },
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            args: true,
            msg: "Enter a valid dateOfBirth",
          },
          notNull: {
            args: true,
            msg: "dateOfBirth must be not empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Developer",
      timestamps: true,
    }
  );
  return Developer;
};
