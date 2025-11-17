const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db.config");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log("MONGO_URI =", process.env.MONGO_URI);

connectDB();

app.use("/api/user", require("./routes/user.routes"));
app.use("/api/mining", require("./routes/mining.routes"));
app.use("/api/config", require("./routes/miningConfig.routes"));
app.use("/api/leaderboard", require("./routes/leaderBoard.routes"));
app.use("/api/referral", require("./routes/referral.routes"));
app.use("/api/admin", require('./routes/admin.routes'));

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
