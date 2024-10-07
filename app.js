// app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
// const errorMiddleware = require("./middlewares/error.middleware");
const logger = require("./utils/logger"); // Winston logger
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

// Custom Middleware for logging HTTP requests
app.use((req, res, next) => {
  const { method, url } = req;
  const start = Date.now();

  res.on("finish", () => {
    const responseTime = Date.now() - start;
    const logMessage = `${method} ${url} ${res.statusCode} - ${responseTime}ms`;
    logger.info(logMessage); // Use Winston for logging
  });

  next();
});

// Middleware Setup
app.use(cors());
app.use(bodyParser.json());

// Register routes
// app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Global Error Handling Middleware
app.use(errorMiddleware);

// Fallback route for unknown endpoints
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

module.exports = app;
