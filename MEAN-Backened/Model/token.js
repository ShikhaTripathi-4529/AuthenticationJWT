const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

const AuthToken = mongoose.model("AuthToken", tokenSchema);

module.exports = AuthToken;
