const cors = require("cors");
const mysql = require("mysql");
const morgan = require("morgan");
//const routes = require("./routes");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.set("port", process.env.PORT);

let connection = mysql.createConnection({
  connectionLimit: 10,
  port: process.env.PORT,
  user: "b2f30ce7f56fdb",
  password: "28e3baa4",
  host: "us-cdbr-east-03.cleardb.com",
  database: "heroku_a9576ac2ef67aab",
});

// Middlewares and Mysql connection
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (error, user) => {
    if (error) {
      res.json(error);
    }
    res.json({ success: true, user: user[0] });
  });
});
//app.use("/", routes);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
