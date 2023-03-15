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
    enum: ['KG', 'liters', 'meters', 'cm'],
  }
},{
    timestamps: true
});

module.exports = mongoose.model("user", UserSchema);