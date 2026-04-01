const dns = require('dns');
dns.setServers(["1.1.1.1"]);
const app = require("./src/app");
const connectDB = require("./src/config/db");
const env = require("./src/config/env");
const { bootstrapReferenceData } = require("./src/services/referenceData.service");

async function start() {
  try {
    await connectDB();
    await bootstrapReferenceData();
    app.listen(env.port, () => {
      console.log(`TravelBharat API running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

start();
