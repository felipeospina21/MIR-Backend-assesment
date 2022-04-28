const express = require("express");
const expressConfig = require("./config/express");
const routes = require("./routes");

const app = express();
expressConfig(app);
routes(app);

module.exports = app;
