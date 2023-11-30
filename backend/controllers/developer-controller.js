const { Developer, Sequelize, sequelize } = require("../database/models");

async function createDev(req, res) {
  try {
    const dev = await Developer.create(req.body);
    return res.status(201).send({ dev });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err });
  }
}

async function fetchAllDevs(req, res) {
  try {
    const devs = await Developer.findAll();
    return res.status(200).send({ devs });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err });
  }
}

async function deleteDev(req, res, next) {
  try {
    const devId = req.query.id;

    const developer = await Developer.findOne({ where: { id: devId } });
    if (developer) {
      await developer.destroy();
      return res.status(202).send(`dev id: ${devId} deleted successfully`);
    } else {
      return res.status(404).send(`dev id: ${devId} not found`);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err });
  }
}

async function editDev(req, res, next) {
  try {
    const devId = parseInt(req.query.id);

    const editedData = req.body;

    const [editedRows] = await Developer.update(editedData, {
      where: { id: devId },
    });

    const editedDev = await Developer.findOne({ where: { id: devId } });

    if (editedRows === 0) {
      return res.status(304).send(`dev id: ${devId} not changed`);
    } else {
      return res.status(202).send({
        message: `dev id: ${devId} updated successfully`,
        dev: editedDev,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ err });
  }
}

async function uploadDevFiles(req, res, next) {
  try {
    if (!req.file) {
      return res.status(404).json({ error: "No file provided" });
    }
    const fileName = req.file.filename;
    res
      .status(200)
      .json({ message: `devFile ${fileName} uploaded successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createDev,
  fetchAllDevs,
  deleteDev,
  editDev,
  uploadDevFiles,
};
