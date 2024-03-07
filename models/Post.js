// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const Post = new Schema({
  title: {
    type: String,
    min: [1, "Too short"],
    max: [20, "Too long"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postedTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports(Post);
