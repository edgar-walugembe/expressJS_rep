const express = require("express");
const router = express.Router();
const {
  registerDev,
  fetchAllDev,
} = require("../controllers/register-controller");

router.get("/", fetchAllDev);

router.post("/sign-up", registerDev);

module.exports = router;

//29:20
