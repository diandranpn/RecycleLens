const express = require("express");
const router = express.Router();
const landFillController = require("../controllers/landFillControllers.js");

router.get("/", landFillController.getAllLandFills);

router.post("/nearby-landfill", landFillController.getNearbyLandFills);

router.post("/create-landfill", landFillController.createLandFill);


module.exports = router;