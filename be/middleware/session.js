const session = require("express-session");
const connectRedis = require("connect-redis");
const redisClient = require("./../services/redisConnection").redis_client;
const CONFIG = require("../config/index");

const RedisStore = connectRedis(session);

module.exports = session({
  store: new RedisStore({ client: redisClient }),
  secret: CONFIG.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  name: "id", // random
  cookie: {
    path: "/",
    secure: CONFIG.NODE_ENV === "local" ? false : true, // if true: only transmit cookie over https, in prod, always activate this
    httpOnly: CONFIG.NODE_ENV === "local" ? false : true, // if true: prevents client side JS from reading the cookie
    maxAge: parseInt(CONFIG.SESSION_MAXAGE), // session max age in milliseconds
    // secure: true, // if true: only transmit cookie over https, in prod, always activate this
    // httpOnly: true, // if true: prevents client side JS from reading the cookie
    // maxAge: 1000 * 60 * 30, // session max age in milliseconds
    sameSite: "none",
    domain: "fitness-dial.web.app",
  },
});
