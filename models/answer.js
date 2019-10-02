const Joi = require("joi");
const mongoose = require("mongoose");

const answerScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Answer = mongoose.model("Answers", answerScheme);

function validateAnswer(answer) {
  const schema = {
    title: Joi.string()
      .max(10)
      .required()
  };

  return Joi.validate(answer, schema);
}

exports.Answer = Answer;
exports.validate = validateAnswer;
