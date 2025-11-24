const mongoose = require("mongoose");

const AllDataSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    description: String,
    image: String,
    date: String,
    details: String,
    readTime: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AllData", AllDataSchema);
