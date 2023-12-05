const express = require("express");
const router = express.Router();

router.post("/", function (req, res, next) {
  return res.status(200).json({ message: "registered successfully" });
});

module.exports = router;
