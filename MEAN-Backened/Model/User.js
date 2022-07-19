"use strict ";
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, " minimum three letters "],
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    max: 1024,
  },
  age: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
//creating the collection create User
const User = mongoose.model("User", userSchema);

module.exports = User;
