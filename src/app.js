const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.set("port", process.env.PORT);

// Middlewares and Mysql connection
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(connection.connect());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
