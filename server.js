require("dotenv").config();
const express = require("express");
const { poolPromise } = require("./config/db");
const app = require("./app");
const logger = require("./utils/logger");
const port =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_PORT
    : process.env.PORT || 3000;

poolPromise
  .then((pool) => {
    app.listen(port, () => {
      console.log(`Server is running on :${port}`);
      logger.info(`Server started and running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    logger.error("Database connection failed", err);
  });
