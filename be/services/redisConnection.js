const redis = require("redis");

const CONFIG = require("./../config/index");
const logger = require("./../utils/logger");

const client = redis.createClient({
  port: CONFIG.REDIS_PORT,
  host: CONFIG.REDIS_HOST,
  password: CONFIG.REDIS_PASSWORD,
});

client.on("connect", function () {
  logger.log("info", "Redis Database connected");
});

client.on("reconnecting", function () {
  logger.log("info", "Redis client reconnecting");
});

client.on("ready", function () {
  logger.log("info", "Redis client is ready");
});

client.on("error", function (err) {
  logger.log("error", "Something went wrong " + err);
});

client.on("end", function () {
  logger.log("info", "Redis client disconnected");
  logger.log("info", "Server is now shutting down...");
  process.exit();
});

module.exports.set = (key, value) => {
  client.set(key, value, redis.print);
  return "done";
};

module.exports.get = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, function (error, result) {
      if (error) {
        logger.log("error", error);
        reject(error);
      }
      resolve(result);
    });
  });
};

module.exports.close = () => {
  client.quit();
};

module.exports.redis_client = client;
