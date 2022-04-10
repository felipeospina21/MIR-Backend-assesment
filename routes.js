const favsList = require("./api/favs");

function routes(app) {
  app.use("/api/favs", favsList);
}

module.exports = routes;
