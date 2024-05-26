const ArticleModel = require("../models/articleModels");

exports.getArticleById = async (req, res) => {
    try {
      const articleId = req.params.id;
      const article = await ArticleModel.findById(articleId);
  
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
  
      res.status(200).json(article);
    } catch (error) {
      console.error("Error fetching article by ID:", error);
      res.status(500).json({ error: error.message });
    }
  };

  exports.getArticlesList = async (req, res) => {
    try {
      const articles = await ArticleModel.find({}, { title: 1, image: 1, _id: 1 });
      res.status(200).json(articles);
    } catch (err) {
      console.error("Error fetching articles:", err);
      res.status(500).json({ error: err.message });
    }
  };
  

exports.createArticle = async (req, res) => {
  try {
    const { title, image, timeToRead, creator, description } = req.body;

    if (!title || !image || !timeToRead || !creator || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newArticle = new ArticleModel({
      title,
      image,
      timeToRead,
      creator,
      description,
    });

    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    console.error("Error creating article:", err);
    res.status(500).json({ error: err.message });
  }
};
