const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");

router.get("/stats", adminController.getDashboardStats);

router.get("/users", adminController.getAllUsers);
router.get("/users/:walletId", adminController.getUserDetails);

router.get("/mining", adminController.getAllMiningSessions);
router.get("/mining/stats", adminController.getMiningStats);

router.get("/payments/stats", adminController.getPaymentStats);

module.exports = router;
