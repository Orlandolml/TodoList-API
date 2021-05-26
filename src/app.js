const cors = require("cors");
const mysql = require("mysql");
const morgan = require("morgan");
const routes = require("./routes");
const myConnection = require("express-myconnection");

const express = require("express");
const app = express();

const errorHandler = require("./middlewares/errorHandler");

app.set("port", process.env.PORT);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(
  myConnection(
    mysql,
    {
      port: process.env.PORT,
      user: "b2f30ce7f56fdb",
      password: "28e3baa4",
      host: "us-cdbr-east-03.cleardb.com",
      database: "heroku_a9576ac2ef67aab",
    },
    "pool"
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
