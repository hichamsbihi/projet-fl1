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
    type: String,
  },

  nom_constructeur: {
    type: String,
  },

  constructeur_pdf: {
    type: String,
  },

  date_visite: {
    type: String,
  },

  image_equipement: {
    type: String,
  },

  QRcode: {
    type: String,
    unique: true,
    required: true,
  },

  Qsse_pdf: {
    type: String,
  },
});

const CorrectifSchema = new mongoose.Schema({
  id_equipement: {
    type: String,
  },
  description: {
    type: String,
  },

  commentaire: {
    type: String,
  },

  description: {
    type: String,
  },
  date: {
    type: String,
  },
});

const PreventifSchema = new mongoose.Schema({
  ots: {
    type: String,
  },

  id_equipement: {
    type: String,
  },

  commentaire: {
    type: String,
  },

  date: {
    type: String,
  },
});

const StockSchema = new mongoose.Schema({
  designation: {
    type: String,
  },

  ref: {
    type: String,
  },

  quantite: {
    type: String,
  },
  code_article: {
    type: String,
  },

  
});

const CommentShema = new mongoose.Schema({
  id_equipement: {
    type: String,
  },

  commentaire: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

const getequipement = ({ id, code, id_equipement, _this_ref }, callback) => {
  let query = id
    ? { _id: id }
    : code
    ? { QRcode: code }
    : id_equipement
    ? { id_equipement: id_equipement }
    : null;
  query &&
    _this_ref.find(query, (err, rep) => {
      if (err) callback(err, null);
      else callback(null, rep);
    });
};

CorrectifSchema.statics.getequipement = getequipement;
PreventifSchema.statics.getequipement = getequipement;
StockSchema.statics.getequipement = getequipement;
CommentShema.statics.getequipement = getequipement;
EquipementSchema.statics.getequipement = getequipement;

const Correctif = new mongoose.model("Correctif", CorrectifSchema);
const Preventif = new mongoose.model("Preventif", PreventifSchema);
const Stock = new mongoose.model("Stock", StockSchema);
const Comment = new mongoose.model("Comment", CommentShema);
const Equipement = mongoose.model("Equipement", EquipementSchema);

export const CORRECTIF = Correctif;
export const PREVENTIF = Preventif;
export const STOCK = Stock;
export const COMMENT = Comment;
export const EQUIPEMENT = Equipement;
