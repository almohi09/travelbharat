const mongoose = require("mongoose");
const env = require("./env");

async function connectDB() {
  await mongoose.connect(env.mongoUri);
  console.log("CONNECTED T0 DB")
}

module.exports = connectDB;
