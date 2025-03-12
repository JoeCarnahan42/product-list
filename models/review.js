const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userName: String,
  text: String,
});

module.exports = mongoose.model("Review", ReviewSchema);
