const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  })
);

// import routes
const allDataRoutes = require("./routes/allData");
const voicesRoutes = require("./routes/voices");
const calendarRoutes = require("./routes/calendar");
const noticesRoutes = require("./routes/notices");
const slidesRoutes = require("./routes/slides");
const adminRoutes = require("./routes/admin");
const imagesRoutes = require("./routes/images");

app.use("/api/alldata", allDataRoutes);
app.use("/api/voices", voicesRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/notices", noticesRoutes);
app.use("/api/slides", slidesRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/images", imagesRoutes);
// const deleteAssetRoutes = require("./routes/deleteAsset");

// app.use("/api/delete-asset", deleteAssetRoutes);

// seed endpoint (dev convenience) - seeds DB with contents from frontend data file
const path = require("path");
const { pathToFileURL } = require("url");

app.post("/api/seed", async (req, res) => {
  try {
    // dynamically import the ESM frontend data file so CommonJS server can read it
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

    // clear collections
    await AllData.deleteMany({});
    await Voice.deleteMany({});
    await CalendarEvent.deleteMany({});
    await Notice.deleteMany({});
    await Slide.deleteMany({});

    // insert
    if (Array.isArray(allData) && allData.length) await AllData.insertMany(allData);
    if (Array.isArray(VoicesInActionContent) && VoicesInActionContent.length)
      await Voice.insertMany(VoicesInActionContent);
    if (Array.isArray(CalendarEvents) && CalendarEvents.length)
      await CalendarEvent.insertMany(CalendarEvents);
    if (Array.isArray(notices) && notices.length) await Notice.insertMany(notices);
    if (Array.isArray(slides) && slides.length) await Slide.insertMany(slides);

    res.json({ ok: true, message: "Seeded database from src/data/alldata.js" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

async function start() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.warn("MONGO_URI not set. Set it in .env or environment variables.");
    }
    await mongoose.connect(uri || "", {
      // options if needed
    });
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
