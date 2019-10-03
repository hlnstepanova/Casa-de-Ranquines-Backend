const Joi = require("joi");
const mongoose = require("mongoose");
const { statusSchema } = require("./status");
const { answerSchema } = require("./answer");

const collaboratorSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 255
  },
  status: { type: statusSchema, required: true },
  birthday: { type: String },
  address: {
    type: String,
    trim: true,
    maxlength: 255
  },
  reference: {
    type: String,
    trim: true,
    maxlength: 255
  },
  neighborhood: {
    type: String,
    trim: true,
    maxlength: 255
  },
  city: {
    type: String,
    trim: true,
    maxlength: 255
  },
  state: {
    type: String,
    trim: true,
    maxlength: 255
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 255
  },
  mobile: { type: String, trim: true, maxlength: 255 },
  workphone: {
    type: String,
    trim: true,
    maxlength: 255
  },
  email: {
    type: String,
    trim: true,
    maxlength: 255
  },
  children: { type: answerSchema },
  religion: {
    type: String,
    trim: true,
    maxlength: 255
  },
  collaborationDay: {
    type: String,
    trim: true,
    maxlength: 255
  },
  value: {
    type: String,
    trim: true,
    maxlength: 255
  },
  purpose: { type: String, trim: true, maxlength: 1000 }
});

const Collaborator = mongoose.model("Collaborators", collaboratorSchema);

function validateCollaborator(collaborator) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    statusId: Joi.objectId().required(),
    birthday: Joi.string(),
    address: Joi.string()
      .min(5)
      .max(100)
      .required(),
    reference: Joi.string(),
    neighborhood: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    phone: Joi.string().allow(""),
    mobile: Joi.string().allow(""),
    workphone: Joi.string().allow(""),
    email: Joi.string().allow(""),
    childrenId: Joi.objectId(),
    religion: Joi.string().allow(""),
    collaborationDay: Joi.string().required(),
    value: Joi.string()
      .max(10)
      .required(),
    purpose: Joi.string().allow("")
  };

  return Joi.validate(collaborator, schema);
}

exports.Collaborator = Collaborator;
exports.validate = validateCollaborator;
