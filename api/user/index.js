const { Router } = require("express");
const { createUser, loginUser } = require("./user.controller");

const router = Router();

router.post("/", createUser);
router.post("/login", loginUser);

module.exports = router;
