const express = require("express")
const router = express.Router();
const { loginOrRegister } = require("../controller/user.controller");

router.post("/login", loginOrRegister);

module.exports = router;
