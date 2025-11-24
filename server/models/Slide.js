const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.Mixed,
    img: String,
    title: String,
    info: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slide", SlideSchema);
