const winston = require("winston");
const CONFIG = require("../config/index");

const transports = [];

// Log in console only for local environment
if (CONFIG.NODE_ENV === "local" || CONFIG.NODE_ENV === "logged")
  transports.push(new winston.transports.Console());

const logger = winston.createLogger({
  transports,
});

module.exports = logger;
