const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  startMining,
  finishMining,
  updateMultiplier,
  getBalance,
  getCurrentMiningSession,
  claimAdReward
} = require("../controller/mining.controller");

router.post("/start", auth, startMining);
router.post("/finish", auth, finishMining);
router.post("/update-multiplier", auth, updateMultiplier);
router.get("/balance", auth, getBalance);
router.get("/session", auth, getCurrentMiningSession);
router.post('/claim-ad-reward', auth, claimAdReward);

module.exports = router;
