const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true }, // Link to blog/event by ID
    img: String,
    title: String,
    info: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slide", SlideSchema);
