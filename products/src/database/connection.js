const mongoose = require("mongoose");
//const { DB_URL } = require("../config");
const dotEnv = require("dotenv");

module.exports = async () => {
  try {
    dotEnv.config();

    //await mongoose.connect(DB_URL);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Conneced..");
  } catch (error) {
    console.log("ERROR while connecting to DB");
    console.log(error);
    process.exit(1);
  }
};
