const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
   level:{
    required:true,
    type:
   }
})

module.exports = mongoose.model('Question', QuestionSchema)