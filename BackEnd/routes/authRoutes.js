const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/", authController.login); // POST /login
router.post("/registrar", authController.registrar); // POST /login/registrar

module.exports = router;