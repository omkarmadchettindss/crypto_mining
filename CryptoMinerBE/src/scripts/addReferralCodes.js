const mongoose = require("mongoose");
const crypto = require("crypto");
require("dotenv").config();

const User = require("../models/user.model");

function generateReferralCode() {
  return crypto.randomBytes(4).toString("hex").toUpperCase();
}

async function addReferralCodes() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const users = await User.find({ referralCode: { $exists: false } });
    console.log(`📊 Found ${users.length} users without referral codes`);

    for (const user of users) {
      let code = generateReferralCode();
      
      // Ensure uniqueness
      while (await User.findOne({ referralCode: code })) {
        code = generateReferralCode();
      }
      
      user.referralCode = code;
      user.referralEarnings = user.referralEarnings || 0;
      user.hasUsedReferral = user.hasUsedReferral || false;
      
      await user.save();
      console.log(`✅ Added referral code ${code} to user ${user.walletId}`);
    }

    console.log("✅ Migration completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

addReferralCodes();
