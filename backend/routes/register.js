const express = require("express");
const router = express.Router();
const {
  registerDev,
  fetchAllDev,
  verifyDev,
} = require("../controllers/register-controller");

router.get("/", fetchAllDev);

router.post("/sign-up", registerDev);

router.post("/log-in", verifyDev);

module.exports = router;

//29:20
