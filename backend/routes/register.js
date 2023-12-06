const express = require("express");
const router = express.Router();
const { registerDev } = require("../controllers/register-controller");

router.get("/", function (req, res, next) {
  res
    .status(200)
    .json({ message: "here is the list of registered developers!" });
});

router.post("/sign-up", registerDev);

module.exports = router;

//29:20
