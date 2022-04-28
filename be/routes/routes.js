const express = require("express");
// const session = require("./../middleware/session");
const singUpRouter = require("./v1/signup.route");
const loginRouter = require("./v1/login.route");
const passChangeRouter = require("./v1/pass_change.route");
const professionalDashboardRouter = require("./v1/professional.dashboard.route");
const clientDashboardRouter = require("./v1/client.dashboard.route");
const masterAdminRouter = require("./v1/MASTER.ADMIN.ROUTE");
const adminDashboardRouter = require("./v1/admin.dashboard.route");

const router = express.Router();

// ADMIN APIS
router.use("/admin", masterAdminRouter);

// Auth New User endpoint
router.use("/authnew", singUpRouter);

// Auth User endpoint
router.use("/auth", loginRouter);

// Auth User endpoint
router.use("/authpasschange", passChangeRouter);

// Professional Dashboard endpointe
router.use("/professional/dashboard", professionalDashboardRouter);

// Customer Dashboard endpoint
router.use("/customer/dashboard", clientDashboardRouter);

// ADMIN APIS
router.use("/admin/dashboard", adminDashboardRouter);

module.exports = router;
