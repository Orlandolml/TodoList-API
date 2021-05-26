const cors = require("cors");
const mysql = require("mysql");
const morgan = require("morgan");
const routes = require("./routes");
const dotenv = require("dotenv").config();
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
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
    },
    "single"
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.use(errorHandler);

app.listen(5000, () => console.log("Server is listening on port 5000"));
