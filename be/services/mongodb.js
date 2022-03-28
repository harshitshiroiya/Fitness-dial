const mongoose = require("mongoose");
const logger = require("./../utils/logger");
const CONFIG = require("./../config/index");

const dbConnect = () =>
  mongoose
    .connect(CONFIG.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    })
    .then(
      () => {
        logger.log("info", "Connected to MongoDB!");
      },
      (err) => logger.log("error", `Something went wrong: ${err}`)
    );

module.exports.dbConnect = dbConnect;
