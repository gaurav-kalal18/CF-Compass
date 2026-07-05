const express = require("express");

const router = express.Router();

const {
  getProfile,
  getRatingHistory,
  getSubmissionHistory,
} = require("../controllers/profileController");

router.get("/:handle", getProfile);
router.get("/rating/:handle", getRatingHistory);
router.get("/status/:handle", getSubmissionHistory);

module.exports = router;