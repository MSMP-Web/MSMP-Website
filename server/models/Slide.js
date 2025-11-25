const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema(
  {
    id: { type: Number }, // Unique numeric ID for slide
    img: String,
    title: String,
    info: String,
    id: { type: Number, default: null }, // Link to blog/event by ID
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slide", SlideSchema);
