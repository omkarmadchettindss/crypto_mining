const express = require("express");
const router = express.Router();
const { getLeaderboard } = require("../controller/leaderBoard.controller");

router.get("/", getLeaderboard);

module.exports = router;
