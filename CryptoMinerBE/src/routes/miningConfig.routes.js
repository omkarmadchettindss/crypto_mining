const express = require("express");
const router = express.Router();
const MiningConfig = require("../models/miningConfig.model");

// GET /api/config/mining
router.get("/mining", async (req, res) => {
  try {
    const config = await MiningConfig.findOne().lean();
    if (!config)
      return res.status(404).json({ message: "MiningConfig not found" });

    res.json({
      version: config.version,
      durations: config.durations,
      multipliers: config.multipliers,
      updatedAt: config.updatedAt,
    });
  } catch (err) {
    console.error("Error fetching MiningConfig:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
