const express = require("express");
const router = express.Router();
const {
  createDev,
  fetchAllDevs,
  deleteDev,
  editDev,
} = require("../controllers/developer-controller");

const {} = require("../middlewares/developer");

/* delete-developer Route. */
router.delete("/delete-dev", deleteDev);

/* fetchAllDevs Route. */
router.get("/", fetchAllDevs);

/* createDev Route. */
router.post("/create-dev", createDev);

/* editDev Route. */
router.patch("/edit-dev", editDev);

module.exports = router;
