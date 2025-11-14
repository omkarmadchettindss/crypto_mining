const mongoose = require("mongoose");
require("dotenv").config();

// Define old User schema with referral fields
const OldUserSchema = new mongoose.Schema({
  walletId: String,
  totalEarned: Number,
  referralCode: String,
  referredBy: String,
  referralEarnings: Number,
  hasUsedReferral: Boolean,
  referredUsers: [String],
});

const OldUser = mongoose.model("OldUser", OldUserSchema, "users");

// Import new models
const User = require("../models/user.model");
const Referral = require("../models/referral.model");

async function migrateToReferralCollection() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Get all users with old schema
    const oldUsers = await OldUser.find({});
    console.log(`📊 Found ${oldUsers.length} users to migrate`);

    let migratedCount = 0;
    let skippedCount = 0;

    for (const oldUser of oldUsers) {
      try {
        // Check if referral record already exists
        let referral = await Referral.findOne({ walletId: oldUser.walletId });
        
        if (referral) {
          console.log(`⚠️  Referral record already exists for ${oldUser.walletId}, skipping...`);
          skippedCount++;
          continue;
        }

        // Create new referral record with data from old user
        referral = new Referral({
          walletId: oldUser.walletId,
          referralCode: oldUser.referralCode || null,
          referredBy: oldUser.referredBy || null,
          referralEarnings: oldUser.referralEarnings || 0,
          hasUsedReferral: oldUser.hasUsedReferral || false,
          referredUsers: oldUser.referredUsers || [],
        });

        await referral.save();
        console.log(`✅ Migrated referral data for ${oldUser.walletId}`);
        migratedCount++;

        // Update user document to remove referral fields (keep only walletId and totalEarned)
        await User.updateOne(
          { walletId: oldUser.walletId },
          { 
            $unset: { 
              referralCode: "",
              referredBy: "",
              referralEarnings: "",
              hasUsedReferral: "",
              referredUsers: ""
            }
          }
        );
        console.log(`✅ Cleaned up user document for ${oldUser.walletId}`);

      } catch (error) {
        console.error(`❌ Error migrating ${oldUser.walletId}:`, error.message);
      }
    }

    console.log("\n📊 Migration Summary:");
    console.log(`   ✅ Migrated: ${migratedCount}`);
    console.log(`   ⚠️  Skipped: ${skippedCount}`);
    console.log(`   📝 Total: ${oldUsers.length}`);
    console.log("\n✅ Migration completed successfully");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrateToReferralCollection();
