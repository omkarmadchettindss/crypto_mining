const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/user.model");

async function addReferredUsersArray() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Find all users without referredUsers array
    const users = await User.find({ referredUsers: { $exists: false } });
    console.log(`📊 Found ${users.length} users without referredUsers array`);

    for (const user of users) {
      user.referredUsers = [];
      await user.save();
      console.log(`✅ Added referredUsers array to user ${user.walletId}`);
    }

    // Now populate the arrays based on existing referredBy relationships
    console.log("\n📊 Populating referredUsers arrays based on existing relationships...");
    
    const referredUsers = await User.find({ referredBy: { $exists: true, $ne: null } });
    console.log(`📊 Found ${referredUsers.length} users who were referred`);

    for (const referredUser of referredUsers) {
      const referrer = await User.findOne({ walletId: referredUser.referredBy });
      
      if (referrer) {
        if (!referrer.referredUsers) {
          referrer.referredUsers = [];
        }
        
        if (!referrer.referredUsers.includes(referredUser.walletId)) {
          referrer.referredUsers.push(referredUser.walletId);
          await referrer.save();
          console.log(`✅ Added ${referredUser.walletId} to ${referrer.walletId}'s referredUsers`);
        }
      }
    }

    console.log("\n✅ Migration completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

addReferredUsersArray();
