const express = require("express");
const router = express.Router();
const articlelController = require("../controllers/articleControllers.js");

router.get("/", articlelController.getArticle);

module.exports = router;