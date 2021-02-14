const mysql = require("mysql");
const morgan = require("morgan");
const routes = require("./routes");
const bodyParser = require("body-parser");
const myConnection = require("express-myconnection");

const express = require("express");
const app = express();

const errorHandler = require("./middlewares/errorHandler");

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => res.send("Hello world"));

// Middlewares
app.use(morgan("dev"));
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "root",
      port: 3306,
      database: "todo_list_app",
    },
    "single"
  )
);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(3000, () => console.log("Server is listening on port 3000"));

app.use(errorHandler);
