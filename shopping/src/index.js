const express = require("express");
//const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const dotenv = require("dotenv");

const StartServer = async () => {
  const app = express();

  await databaseConnection();
  await expressApp(app);
  dotenv.config();

  const PORT = process.env.PORT;

  app
    .listen(PORT, () => {
      console.log(`Listening on PORT : ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit(1);
    });
};

StartServer();
