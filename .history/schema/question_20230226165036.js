const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
   subject:{required:true},
    level:{
    required:true,
    type:String
   },

})

module.exports = mongoose.model('Question', QuestionSchema)