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
    const devId = req.params.id;

    const developer = await Developer.findOne({ where: { id: devId } });
    if (developer) {
      await developer.destroy();
      return res.status(200).send(`dev id: ${devId} deleted successfully`);
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
    const devId = parseInt(req.params.id);

    const editedData = req.body;

    const [editedRows] = await Developer.update(editedData, {
      where: { id: devId },
    });

    const editedDev = await Developer.findOne({ where: { id: devId } });

    if (editedRows === 0) {
      return res.status(404).send(`dev id: ${devId} not found`);
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

module.exports = {
  createDev,
  fetchAllDevs,
  deleteDev,
  editDev,
};
