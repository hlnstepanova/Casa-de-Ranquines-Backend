const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Answer, validate } = require("../models/answer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const answers = await Answer.find()
    .select("-__v")
    .sort("name");
  res.send(answers);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let answer = new Answer({ name: req.body.name });
  answer = await answer.save();

  res.send(answer);
});

router.put("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const answer = await Answer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );

  if (!answer)
    return res.status(404).send("The answer with the given ID was not found.");

  res.send(answer);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const answer = await Answer.findByIdAndRemove(req.params.id);

  if (!answer)
    return res.status(404).send("The answer with the given ID was not found.");

  res.send(answer);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const answer = await Answer.findById(req.params.id).select("-__v");

  if (!answer)
    return res.status(404).send("The status with the given ID was not found.");

  res.send(answer);
});

module.exports = router;
