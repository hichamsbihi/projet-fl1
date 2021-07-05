import mongoose from "mongoose";

const EquipementSchema = new mongoose.Schema({

  nom: {
    type: String,
  },

  niveau_strategique: {
    type: String,
  },

  emplacement: {
    type: String,
  },

  ref: {
    type: Number,
  },

  nom_constructeur: {
    type: String,
  },

  constructeur_pdf: {
    type: String,
  },

  date_visite: {
    type: Date,
  },

  image_equipement: {
    type: String,
  },

  QRcode: {
    type: String,
    unique: true,
    required: true
  },

  Qsse_pdf: {
    type: String,
  },
});

const CorrectifSchema = new mongoose.Schema({

  id_equipement: [],

  commentaire: {
    type: String,
  },

  description: {
    type: String,
  },
  date: {
    type: Date,
  },
});

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
  }
});

const StockSchema = new mongoose.Schema({
 
  designation: {
    type: String,
  },

  ref: {
    type: String,
  },

  quantite: {
    type: Number,
  },

  site: {
    type: String,
  },

  emplacement: {
    type: String,
  },
});

const Correctif = new mongoose.model("Correctif", CorrectifSchema);
const Preventif = new mongoose.model("Preventif", PreventifSchema);
const Stock = new mongoose.model("Stock", StockSchema);
const Equipement = mongoose.model("Equipement", EquipementSchema);


const getequipement = ({ id, code }, callback) => {
  let query = id ? { _id: id } : code ? { QRcode: code } : null;
  query &&
    this.find(query, (err, rep) => {
      if (err) callback(err, null);
      else callback(null, rep);
    });
};


// Correctif.static.getCorrectifData = getequipement;
// Preventif.static.getPreventiffData = getequipement;
// Stock.static.getStockData = getequipement;
// Equipement.static.getEquipementData = getequipement;

export const CORRECTIF = Correctif;
export const PREVENTIF = Preventif;
export const STOCK = Stock;
export const EQUIPEMENT = Equipement;

