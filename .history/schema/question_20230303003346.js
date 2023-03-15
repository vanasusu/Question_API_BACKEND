const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  user:{ref:'user',type:mongoose.Schema.Types.ObjectId}  ,
  subject: { required: true, type: String },
  level: {required: true,type: String , enum:['Easy','Medium','Hard']},
  topic: { required: true, type: String },
  question: { required: true, type: String },
},{
    timestamps: true
});

module.exports = mongoose.model("Question", QuestionSchema);
