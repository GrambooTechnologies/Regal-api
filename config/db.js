const sql = require("mssql");

const dbConfig = {
  server: "regalgold1.ck2u3egliyrz.ap-south-1.rds.amazonaws.com", // Corrected from 'host' to 'server'
  user: "sa",
  password: "P@SSW0RD",
  database: "TEST",
  port: 1433,
  options: {
    encrypt: true, // Use this if you're connecting to Azure MSSQL or if encryption is required
    trustServerCertificate: true, // Necessary if you're connecting with self-signed certificates
    enableArithAbort: true, // Required by SQL Server
  },
};

// Create connection pool and handle connection
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    throw new Error(err);
  });

module.exports = {
  sql,
  poolPromise,
};
