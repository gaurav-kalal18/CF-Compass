const express = require("express");

const router = express.Router();

const {
    getAnalytics,
} = require("../controllers/analyticsController");

router.get("/:handle", getAnalytics);

module.exports = router;