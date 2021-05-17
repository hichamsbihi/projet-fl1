const mongoose = require("mongoose");

const CorrectifSchema = new mongoose.Schema({
  id: {
    type: Number,
  },

  id_equipement: [],

  commentaire: {
    type: String,
  },

  date: {
    type: Date,
  },
});

const Correctif = new mongoose.model("Correctif", CorrectifSchema);
exports.Correctif = Correctif;
