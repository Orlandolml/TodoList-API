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
      user: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
    },
    "single"
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.json({ greeting: "hello world!" }));
app.use("/", routes);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
