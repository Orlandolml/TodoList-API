require("dotenv").config();
const cors = require("cors");
const mysql = require("mysql");
const morgan = require("morgan");
const express = require("express");
const routes = require("./routes");
const myConnection = require("express-myconnection");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.set("port", process.env.PORT);

app.use(
  myConnection(
    mysql,
    {
      port: process.env.PORT_DB,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
    },
    "single"
  )
);

// Middlewares and Mysql connection
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
