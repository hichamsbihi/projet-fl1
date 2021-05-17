const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
  },
});

const User = new mongoose.model("User", UserSchema);

exports.User = User;
