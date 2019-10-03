const { Collaborator, validate } = require("../models/collaborator");
const { Status } = require("../models/status");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const collaborators = await Collaborator.find()
    .select("-__v")
    .sort("name");
  res.send(collaborators);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const status = await Status.findById(req.body.statusId);
  if (!status) return res.status(400).send("Invalid status.");

  const collaborator = new Collaborator({
    name: req.body.name,
    status: {
      _id: status._id,
      name: status.name
    },
    address: req.body.address,
    neighborhood: req.body.neighborhood,
    city: req.body.city,
    state: req.body.state,
    collaborationDay: req.body.collaborationDay,
    value: req.body.value
  });
  await collaborator.save();

  res.send(collaborator);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const status = await Status.findById(req.body.statusId);
  if (!status) return res.status(400).send("Invalid status.");

  const collaborator = await Collaborator.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      status: {
        _id: status._id,
        name: status.name
      },
      address: req.body.address,
      neighborhood: req.body.neighborhood,
      city: req.body.city,
      state: req.body.state,
      collaborationDay: req.body.collaborationDay,
      value: req.body.value
    },
    { new: true }
  );

  if (!collaborator)
    return res
      .status(404)
      .send("The collaborator with the given ID was not found.");

  res.send(collaborator);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const collaborator = await Collaborator.findByIdAndRemove(req.params.id);

  if (!collaborator)
    return res
      .status(404)
      .send("The collaborator with the given ID was not found.");

  res.send(collaborator);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const collaborator = await Collaborator.findById(req.params.id).select(
    "-__v"
  );

  if (!collaborator)
    return res
      .status(404)
      .send("The collaborator with the given ID was not found.");

  res.send(collaborator);
});

module.exports = router;
