const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 * 1024, // Move to environemnt variable
  },
});

module.exports.multer = multer;
