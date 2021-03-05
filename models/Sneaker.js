const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerModel = new Schema({

  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  category: String [men, women, kids],
  id_tags: [ObjectId]
  });


const SneakerModel = mongoose.model("sneakers", sneakerModel);

module.exports = SneakerModel ;
