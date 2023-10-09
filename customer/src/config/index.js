const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  //dev mode, load appropriate config file
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config(); //If no key, load default
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
};
