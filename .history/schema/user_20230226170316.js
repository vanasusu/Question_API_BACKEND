const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required:true,
    enum: ['Tutor', 'Teacher', 'meters', 'cm'],
  }
},{
    timestamps: true
});

module.exports = mongoose.model("user", UserSchema);