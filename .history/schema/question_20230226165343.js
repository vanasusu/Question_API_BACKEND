const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  subject: { required: true, type: String },
  level: {required: true,type: String},
  topic: { required: true, type: String },
});

module.exports = mongoose.model("Question", QuestionSchema);
