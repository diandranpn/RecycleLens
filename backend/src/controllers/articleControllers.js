const { default: mongoose } = require("mongoose");
const ArticleModel = require("../models/articleModels");

exports.getArticle = async (req, res, next) => {
  try {
    const dummyData = {
      message: "This is a dummy response",
      data: [
        { id: 1, title: "Article 1", content: "Content for article 1" },
        { id: 2, title: "Article 2", content: "Content for article 2" },
      ],
    };

    res.status(200).json(dummyData);
  } catch (err) {
    console.error("Error creating Account:", error);
    res.status(500).json({ error: err });
  }
};
