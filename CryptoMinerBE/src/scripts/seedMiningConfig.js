// require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const MiningConfig = require("../models/miningConfig.model");

const MONGO_URI =
  "mongodb+srv://omkarmadchettindss_db_user:Omkar%40ndss@cluster0.5xpltr2.mongodb.net/crypto";

async function seedConfig() {
  await mongoose.connect(MONGO_URI);

  const existing = await MiningConfig.findOne();
  if (existing) {
    console.log("⏭️ Config already exists, skipping.");
    process.exit(0);
  }

  await MiningConfig.create({
    version: 1,
    durations: [
      { hours: 1, label: "1 Hour" },
      { hours: 2, label: "2 Hours" },
      { hours: 4, label: "4 Hours" },
      { hours: 12, label: "12 Hours" },
      { hours: 24, label: "24 Hours" },
    ],
    multipliers: [
      { value: 1, rate: 0.01, reward1h: 36 },
      { value: 2, rate: 0.02, reward1h: 72 },
      { value: 3, rate: 0.03, reward1h: 108 },
      { value: 4, rate: 0.04, reward1h: 144 },
      { value: 5, rate: 0.05, reward1h: 180 },
      { value: 6, rate: 0.06, reward1h: 216 },
    ],
    updatedBy: "seed-script",
  });

  console.log("✅ MiningConfig seeded successfully");
  process.exit(0);
}

seedConfig().catch((err) => {
  console.error(err);
  process.exit(1);
});
