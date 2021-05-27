const cors = require("cors");
const mysql = require("mysql");
const express = require("express");
const routes = require("./routes");
const myConnection = require("express-myconnection");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.set("port", process.env.PORT);

let connection = mysql.createConnection({
  port: process.env.PORT,
  user: "uyzg3ncerjmbpvgk",
  password: "j1WD96hFbw2CxUXkJynM",
  host: "bqbvr2fmf5brtjqhuaky-mysql.services.clever-cloud.com",
  database: "bqbvr2fmf5brtjqhuaky",
});

// Middlewares and Mysql connection
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connection.connect();

app.get("/", (req, res) => {
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
