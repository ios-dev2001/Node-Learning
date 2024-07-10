const userRegister = require("../../controllers/registerController");
const express = require("express");
const router = express.Router();

router.post("/", userRegister);

module.exports = router;
