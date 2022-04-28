const express = require("express");
const router = express.Router();

const admin = require("../../controllers/admin.dashboard");

router.get("/files", admin.getFiles);

router.post("/:fileId/approve", admin.approveFile);

module.exports = router;
