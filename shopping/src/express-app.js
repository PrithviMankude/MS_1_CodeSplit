const express = require("express");
const cors = require("cors");
const HandleErrors = require("./utils/error-handler");
const { customer, products, shopping } = require("./api");

//1. Prithvi: Add hanbdle errors once server is UP

module.exports = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  //Add APIs here
  console.log("Prithvi: In express-app");
  customer(app);
  products(app);
  shopping(app);

  app.use(HandleErrors);
};
