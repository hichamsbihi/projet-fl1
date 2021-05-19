import mongoose from "mongoose";

const PreventifSchema = new mongoose.Schema({
  ots: {
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

const Preventif = new mongoose.model("Preventif", PreventifSchema);
exports.Preventif = Preventif;
