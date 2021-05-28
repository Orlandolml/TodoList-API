const cors = require("cors");
const mysql = require("mysql");
const express = require("express");
const routes = require("./routes");
const myConnection = require("express-myconnection");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.set("port", 5000);

app.use(
  myConnection(
    mysql,
    {
      port: /*process.env.PORT_DB*/ 5000,
      user: /*process.env.DB_USER*/ "root",
      password: /*process.env.DB_PASSWORD*/ "root",
      host: /*process.env.DB_HOST*/ "localhost",
      database: /*process.env.DB_NAME*/ "todo_list_app",
    },
    "single"
  )
);

// Middlewares and Mysql connection
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${5000}`)
);
