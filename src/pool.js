const mysql = require("mysql");

let pool = mysql.createPool({
  connectionLimit: 10,
  port: process.env.PORT,
  user: "b2f30ce7f56fdb",
  password: "28e3baa4",
  host: "us-cdbr-east-03.cleardb.com",
  database: "heroku_a9576ac2ef67aab",
});

pool.getConnection((error, conn) => {
  if (error) {
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("Database connection was closed.");
    }
    if (error.code === "ER_CON_COUNT_ERROR") {
      console.log("Database has too many connections");
    }
    if (error.code === "ECONNREFUSED") {
      console.log("Database connection was refused");
    }
  }
  if (conn) {
    conn.release();
    return;
  }
});

module.exports = pool;
