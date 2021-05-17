const mongoose = require("mongoose");

const EquipementSchema = new mongoose.Schema({
  Id: {
    type: Number,
    unique: true,
  },

  Nom: {
    type: String,
  },

  Niveau_strategique: {
    type: String,
  },

  Emplacement: {
    type: String,
  },

  Ref: {
    type: Number,
  },

  Nom_constructeur: {
    type: String,
  },

  Constructeur_pdf: {
    type: String,
  },

  date_visite: {
    type: Date,
  },

  Image_equipement: {
    type: String,
  },

  QRcode: {
    type: Number,
  },

  Qsse_pdf: {
    type: String,
  },
});

const Equipement = mongoose.model("Equipement", EquipementSchema);

exports.Equipement = Equipement;
