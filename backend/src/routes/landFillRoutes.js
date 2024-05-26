const express = require("express");
const router = express.Router();
const landFillController = require("../controllers/landFillControllers.js");

router.get("/", landFillController.getAllLandFills);

router.get("/nearby-landfill", landFillController.getNearbyLandFills);

router.post("/create-landfill", landFillController.createLandFill);

router.get('/findByName', landFillController.findLandFillByName);


module.exports = router;