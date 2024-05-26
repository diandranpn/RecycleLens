const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  timeToRead: {
    type: Number,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Article", ArticleSchema);
