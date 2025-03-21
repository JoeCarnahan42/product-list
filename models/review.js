const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userName: String,
  text: String,
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = { ReviewSchema, Review };
