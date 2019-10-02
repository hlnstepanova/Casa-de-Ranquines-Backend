const Joi = require("joi");
const mongoose = require("mongoose");

const statusScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  }
});

const Status = mongoose.model("Statuses", statusScheme);

function validateStatus(status) {
  const schema = {
    title: Joi.string()
      .max(50)
      .required()
  };

  return Joi.validate(status, schema);
}

exports.Status = Status;
exports.validate = validateStatus;
