const { Router } = require("express");
const { createFavsList } = require("./favs.controller");

const router = Router();

router.post("/", createFavsList);

module.exports = router;
