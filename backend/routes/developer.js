const express = require("express");
const router = express.Router();

const {
  createDev,
  fetchAllDevs,
  deleteDev,
  editDev,
  uploadDevFiles,
} = require("../controllers/developer-controller");

const { upload } = require("../middlewares/developer");

/* delete-developer Route. */
router.delete("/delete-dev", deleteDev);

/* fetchAllDevs Route. */
router.get("/", fetchAllDevs);

/* createDev Route. */
router.post("/create-dev", createDev);

/* editDev Route. */
router.patch("/edit-dev", editDev);

router.post("/upload-devFiles", upload.single("images"), uploadDevFiles);

module.exports = router;
