const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const tagModel = new Schema({

  label: String
  });


const TagModel = mongoose.model("tags", tagModel);


module.exports = TagModel;