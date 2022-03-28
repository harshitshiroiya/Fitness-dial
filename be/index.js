const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const CONFIG = require("./config/index");
const logger = require("./utils/logger");
const mongodb = require("./services/mongodb");
// const session = require("./middleware/session");

const app = express();

// app.set("trust proxy", 1);
// app.use(session);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Cors
app.use(cors());

// Routes
app.use("/api", routes);

// Will be removed later. Kept for testing.
app.get("/", (req, res) => {
  res.send("Be"); // Placeholder
});

(async () => {
  await mongodb.dbConnect();
  app.listen(CONFIG.PORT || 4000, () =>
    logger.log("info", `Started listening on port:${CONFIG.PORT || 4000}`)
  );
})();
