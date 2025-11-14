const express = require('express');
const router = express.Router();
const {
  getReferralCode,
  submitReferralCode,
  canUseReferral,
} = require('../controller/referral.controller');
const auth = require('../middleware/auth');

router.get('/code', auth, getReferralCode);
router.post('/submit', auth, submitReferralCode);
router.get('/can-use', auth, canUseReferral);

module.exports = router;
