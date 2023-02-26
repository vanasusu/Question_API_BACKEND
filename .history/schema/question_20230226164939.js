const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
   level:{}
})

module.exports = mongoose.model('Question', QuestionSchema)