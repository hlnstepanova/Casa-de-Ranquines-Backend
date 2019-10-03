const Joi = require("joi");
const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  }
});

const Status = mongoose.model("Statuses", statusSchema);

function validateStatus(status) {
  const schema = {
    title: Joi.string()
      .max(50)
      .required()
  };

  return Joi.validate(status, schema);
}

exports.statusSchema = statusSchema;
exports.Status = Status;
exports.validate = validateStatus;
