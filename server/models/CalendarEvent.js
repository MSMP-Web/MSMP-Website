const mongoose = require("mongoose");

const CalendarEventSchema = new mongoose.Schema(
  {
    title: String,
    date: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CalendarEvent", CalendarEventSchema);
