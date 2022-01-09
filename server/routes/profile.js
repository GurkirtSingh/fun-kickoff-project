const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createProfile,
  updateProfile,
  getProfile,
} = require("../controllers/profile");

router.route("/create").post(protect, createProfile);
router.route("/update").put(protect, updateProfile);
router.route("/get").get(protect, getProfile);

module.exports = router;
