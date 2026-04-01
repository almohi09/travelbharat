const connectDB = require("../src/config/db");
const { bootstrapReferenceData } = require("../src/services/referenceData.service");

async function run() {
  try {
    await connectDB();
    await bootstrapReferenceData();
    console.log("Reference data seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Reference seed failed:", error.message);
    process.exit(1);
  }
}

run();
