const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
   level:{
    required:true,
    ty
   }
})

module.exports = mongoose.model('Question', QuestionSchema)