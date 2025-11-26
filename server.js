const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const { pathToFileURL } = require("url");

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed domains for CORS
const allowedOrigins = [
  "http://localhost:5173", // keep for local dev
  "https://msmporg.in", // production
];

// CORS must be before all routes
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// -------------------- IMPORT ROUTES --------------------
const allDataRoutes = require("./routes/allData");
const voicesRoutes = require("./routes/voices");
const calendarRoutes = require("./routes/calendar");
const noticesRoutes = require("./routes/notices");
const slidesRoutes = require("./routes/slides");
const adminRoutes = require("./routes/admin");
const imagesRoutes = require("./routes/images");
const healthCheck = require("./routes/healthCheck"); // Import health check route

// -------------------- USE ROUTES --------------------
app.use("/api/alldata", allDataRoutes);
app.use("/api/voices", voicesRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/notices", noticesRoutes);
app.use("/api/slides", slidesRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/images", imagesRoutes);

// -------------------- SEED ROUTE --------------------
app.post("/api/seed", async (req, res) => {
  try {
    const dataPath = path.resolve(__dirname, "..", "src", "data", "alldata.js");
    const dataModule = await import(pathToFileURL(dataPath).href);

    const allData = dataModule.allData || dataModule.default?.allData || [];
    const VoicesInActionContent = dataModule.VoicesInActionContent || [];
    const CalendarEvents = dataModule.CalendarEvents || [];
    const notices = dataModule.notices || [];
    const slides = dataModule.slides || [];

    const AllData = require("./models/AllData");
    const Voice = require("./models/Voice");
    const CalendarEvent = require("./models/CalendarEvent");
    const Notice = require("./models/Notice");
    const Slide = require("./models/Slide");

    // clear existing
    await AllData.deleteMany({});
    await Voice.deleteMany({});
    await CalendarEvent.deleteMany({});
    await Notice.deleteMany({});
    await Slide.deleteMany({});

    // insert new
    if (allData.length) await AllData.insertMany(allData);
    if (VoicesInActionContent.length)
      await Voice.insertMany(VoicesInActionContent);
    if (CalendarEvents.length) await CalendarEvent.insertMany(CalendarEvents);
    if (notices.length) await Notice.insertMany(notices);
    if (slides.length) await Slide.insertMany(slides);

    res.json({ ok: true, message: "Database seeded successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// -------------------- HEALTH CHECK ROUTE --------------------
app.get("/ping", (req, res) => {
  res.status(200).send("OK");
});


// -------------------- START SERVER --------------------
async function start() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) console.warn("MONGO_URI is not set!");

    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
require("./routes/healthCheck");