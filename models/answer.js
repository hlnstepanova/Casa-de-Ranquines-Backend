const Joi = require("joi");
const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  }
});

const Answer = mongoose.model("Answers", answerSchema);

function validateAnswer(answer) {
  const schema = {
    title: Joi.string()
      .max(10)
      .required()
  };

  return Joi.validate(answer, schema);
}

exports.answerSchema = answerSchema;
exports.Answer = Answer;
exports.validate = validateAnswer;
