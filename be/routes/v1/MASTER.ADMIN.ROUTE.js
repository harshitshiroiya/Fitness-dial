const express = require("express");
const router = express.Router();

const admin = require("../../controllers/MASTER.ADMIN");

router.post("/createProfessional", admin.createProfessional);

router.post("/createCustomer", admin.createCustomer);

router.post("/createPlan/:professionalId", admin.createPlan);

router.get("/plans", admin.getAllPlans);

router.get("/users", admin.getAllUsers);

module.exports = router;
