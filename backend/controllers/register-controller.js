const { User, Sequelize, sequelize } = require("../database/models");

async function registerDev(req, res, next) {
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
  const savedUser = await newUser.save().catch((err) => {
    console.log("error saving user: ", err);
    res.json({ error: "Cannot register User right away!" });
  });
  if (savedUser) {
    res.status(200).json({ message: "registered successfully" });
  }
  console.log(req.body);
}

async function fetchAllDev(req, res) {
  res
    .status(200)
    .json({ message: "here is the list of registered developers!" });
}

module.exports = { registerDev, fetchAllDev };
