const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userModel = new Schema({

  name: String,
  lastname: String,
  email: String,
  password: String
  });


const UserModel = mongoose.model("users", userModel);


module.exports = UserModel;