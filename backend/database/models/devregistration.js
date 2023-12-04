"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DevRegistration extends Model {
    static associate(models) {
      // define association here
    }
  }
  DevRegistration.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "username must be unique",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { args: true, msg: "password must be unique" },
        len: {
          args: [10, 500],
          msg: "password must be at least 10 characters",
        },
      },
    },
    {
      sequelize,
      modelName: "DevRegistration",
    }
  );
  return DevRegistration;
};
