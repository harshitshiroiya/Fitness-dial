const express = require("express");
const router = express.Router();
// const authenticate = require("../../middleware/authenticate");

const user = require("../../controllers/user.auth");

router.post("/signup", user.signUp);

router.post("/createpass/:userId/:token", user.createPassword);

// router.get("/logout", authenticate, user.logout);

// router.post("/change", authenticate, user.changePass);

// router.post("/forgot", user.forgotPass);

// router.get("/validate", user.validateCookie);

module.exports = router;
