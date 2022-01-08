const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { createProfile } = require("../controllers/profile");

router.route("/create").post(protect, createProfile);

module.exports = router;
