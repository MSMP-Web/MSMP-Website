const mongoose = require("mongoose");

const VoiceSchema = new mongoose.Schema(
  {
    id: Number,
    position: Number,
    title: String,
    description: String,
    image: String,
    date: String,
    details: String,
    readTime: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voice", VoiceSchema);
