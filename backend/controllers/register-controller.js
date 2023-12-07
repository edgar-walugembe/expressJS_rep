const { User, Sequelize, sequelize } = require("../database/models");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../test/.env" });

async function registerDev(req, res, next) {
  try {
    const { username, email, password } = req.body;

    const alreadyExitsUser = await User.findOne({
      where: { username, email },
    }).catch((err) => {
      console.log("error: ", err);
    });

    if (alreadyExitsUser) {
      res.json({ message: "User with username or email already exists!" });
    }

    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();

    if (savedUser) {
      res.status(200).json({ message: "registered successfully" });
    }

    console.log(req.body);
  } catch (err) {
    console.log("error saving user: ", err);
    res.json({ error: "Cannot register User right away!" });
  }
}

async function fetchAllDev(req, res) {
  res
    .status(200)
    .json({ message: "here is the list of registered developers!" });
}

async function verifyDev(req, res) {
  try {
    const { username, email, password } = req.body;

    const verifiedUser = await User.findOne({ where: { username, email } });

    if (!verifiedUser) {
      return res.json({
        message: `username or email or password does not match! 0000`,
      });
    }

    if (verifiedUser.password !== password) {
      return res.json({
        message: `username or email or password does not match! 0001`,
      });
    }

    const jwtToken = jwt.sign(
      { id: verifiedUser.id, email: verifiedUser.email },
      process.env.JWT_SECRET
    );

    res.json({ message: "Welcome Back Dev!", token: jwtToken });
  } catch (err) {
    console.log("error with verifying User: ", err);
  }
}

module.exports = { registerDev, fetchAllDev, verifyDev };

//43:00
