// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { restClient } = require("@polygon.io/client-js");

const app = express();

const rest = restClient("RCstoqjO76Y3RElO8VEDPlbxZKmWDI60");

app.use(function (req, res, next) {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.enable("trust proxy");

app.post("/api/fetchStockData", (req, res) => {
  // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION

  const { stock, date } = req.query;

  if (stock && date) {
    rest.stocks
      .dailyOpenClose(stock, date, true)
      .then((data) => {
        const resStockData = data;
        res.status(200).json(resStockData);
      })
      .catch((e) => {
        // console.error("An error happened:", e);
        res.status(400).json({ message: "Stock data not available" });
      });
  } else {
    res.status(400).json({ message: "Mandatory data is missing" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
