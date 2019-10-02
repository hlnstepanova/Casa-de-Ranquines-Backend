const Joi = require("joi");
const mongoose = require("mongoose");
const { statusScheme } = require("./status");
const { answerScheme } = require("./answer");

const collaboratorScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  status: { type: statusScheme, required: true },
  birthday: { type: Date },
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  reference: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  neighborhood: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  city: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  state: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  phone: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  mobile: { type: String, trim: true, minlength: 5, maxlength: 255 },
  workphone: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  email: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  children: { type: answerScheme },
  religion: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  collaborationDay: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  value: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  purpose: { type: String, trim: true, minlength: 5, maxlength: 255 }
});

const Collaborator = mongoose.model("Collaborators", collaboratorScheme);

function validateCollaborator(collaborator) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    statusId: Joi.objectId().required(),
    address: Joi.string()
      .min(5)
      .max(100)
      .required(),
    collaborationDay: Joi.date().required(),
    value: Joi.string()
      .max(10)
      .required()
  };

  return Joi.validate(collaborator, schema);
}

exports.Collaborator = Collaborator;
exports.validate = validateCollaborator;
