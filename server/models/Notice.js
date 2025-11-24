const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema(
  {
    title: String,
    text: String,
    imageUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", NoticeSchema);
