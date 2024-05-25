const express = require("express");
const router = express.Router();
const landFillController = require("../controllers/landFillControllers.js");

router.get("/", landFillController.getLandFill);

module.exports = router;