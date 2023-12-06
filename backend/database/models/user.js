"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "username_unique",
          msg: "username must be unique",
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "email_unique",
          msg: "email must be unique",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { name: "password_unique", msg: "password must be unique" },
        len: {
          args: [10, 500],
          msg: "password must be at least 10 characters",
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
