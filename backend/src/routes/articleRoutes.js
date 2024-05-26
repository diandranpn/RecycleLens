const express = require("express");
const router = express.Router();
const articlelController = require("../controllers/articleControllers.js");

router.get("/get-list", articlelController.getArticlesList);

router.get("/get-by-id/:id", articlelController.getArticleById);

router.post("/create-article", articlelController.createArticle);

module.exports = router;