const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerModel = new Schema({

  name: String,
  ref: String,
  size: Number,
  description: String,
  price: Number,
  category: {
    type: String,
    enum: ["men", "women", "kids"]
  },
  id_tags: {
    type: Schema.Types.ObjectId,
    ref: "tags"
  }
  });


const SneakerModel = mongoose.model("sneakers", sneakerModel);

module.exports = SneakerModel ;
