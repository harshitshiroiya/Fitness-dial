const express = require("express");
// const session = require("./../middleware/session");
const singUpRouter = require("./v1/signup.route");
const loginRouter = require("./v1/login.route");

const router = express.Router();

// Auth endpoints
router.use("/authnew", singUpRouter);
router.use("/auth", loginRouter);

module.exports = router;
