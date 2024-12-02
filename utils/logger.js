const winston = require("winston");

// Define the logging format and transport (console and file logging)
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(), // Add color for console output
    winston.format.timestamp(), // Add timestamp to logs
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    // new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Log errors to a file
    new winston.transports.File({ filename: "logs/combined.log" }), // Log all messages to a file
  ],
});

// Export the logger to use in the app
module.exports = logger;
