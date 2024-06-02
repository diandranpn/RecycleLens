require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const ConnectToMongodb = require("./src/lib/db");

const articleRoute = require("./src/routes/articleRoutes")
const landFillRoute = require("./src/routes/landFillRoutes")


const app = express();
const frontendDomain = process.env.DOMAIN_FRONTEND || "http://localhost:3000";
app.use(
  cors({
    origin : frontendDomain,
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "1000mb" }));

ConnectToMongodb();

const port = process.env.PORT || 5001;


// app.listen(port, () => {
//     console.log(`Server is running on port : ${port}`);
//   });

  app.use("/article", articleRoute);
  app.use("/landfill", landFillRoute);

  export default app

  