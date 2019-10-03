const { Status } = require("./models/status");
const { Answer } = require("./models/answer");
const { Collaborator } = require("./models/collaborator");
const mongoose = require("mongoose");
const config = require("config");
const _ = require("lodash");
const answersData = require("./answers.json");
const statusesData = require("./statuses.json");
const collaboratorsData = require("./collaborators.json");

async function seed() {
  await mongoose.connect(config.get("db"));

  await Status.deleteMany({});
  await Answer.deleteMany({});
  await Collaborator.deleteMany({});

  var statusMap = {};
  var childrenMap = {};

  for (let status of statusesData) {
    const result = await new Status({ name: status.name }).save();
    statusMap[result.name] = result._id;
  }

  for (let answer of answersData) {
    const result = await new Answer({ name: answer.name }).save();
    childrenMap[result.name] = result._id;
  }

  for (let collaborator of collaboratorsData) {
    let status;
    if (collaborator.status === "ativado") {
      status = {
        _id: statusMap["ativado"],
        name: collaborator.status
      };
    } else {
      status = {
        _id: statusMap["desativado"],
        name: collaborator.status
      };
    }

    collaborator.status = status;

    let children;
    if (collaborator.children) {
      if (collaborator.children === true) {
        children = {
          _id: childrenMap["sim"],
          name: "sim"
        };
      } else {
        children = {
          _id: childrenMap["não"],
          name: "não"
        };
      }
    } else {
      children = {
        _id: childrenMap[""],
        name: ""
      };
    }

    collaborator.children = children;

    const result = await new Collaborator(collaborator).save();
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
