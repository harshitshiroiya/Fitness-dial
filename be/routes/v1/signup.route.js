const express = require("express");
const router = express.Router();

const user = require("../../controllers/user.auth");

router.post("/signup", user.signUp);

router.post("/forgot",user.forgotPass);

router.post("/createpass/:userId/:token", user.createPassword);

module.exports = router;
