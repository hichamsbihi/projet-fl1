import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  id: {
    type: Number,
  },

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

const Stock = new mongoose.model("Stock", StockSchema);

exports.Stock = Stock;
