// healthCheck.js
const cron = require("node-cron");
const axios = require("axios");

// URL of your deployed backend
const SELF_URL = "https://msmp-website.onrender.com";

// Ping every 14 minutes
cron.schedule("*/14 * * * *", async () => {
  try {
    const res = await axios.get(`${SELF_URL}/ping`);
    console.log("🔁 Health check ping sent:", new Date().toISOString());
  } catch (err) {
    console.error("❌ Health check failed:", err.message);
  }
});
