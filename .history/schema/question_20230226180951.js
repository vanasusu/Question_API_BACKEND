const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  user:{ref:}  
  subject: { required: true, type: String },
  level: {required: true,type: String },
  topic: { required: true, type: String },
},{
    timestamps: true
});

module.exports = mongoose.model("Question", QuestionSchema);
