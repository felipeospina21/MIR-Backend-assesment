const favsList = require("./api/favs");
const user = require("./api/user");
const isAuthenticated = require("./middlewares/auth");

function routes(app) {
  app.use("/api/favs", isAuthenticated, favsList);
  app.use("/auth/local", user);
}

module.exports = routes;
