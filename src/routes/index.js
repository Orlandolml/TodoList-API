const router = require("express").Router();
const users = require("./users");
const todos = require("./todos");
const scheduledTasks = require("./scheduledTasks");

router.use("/users", users);
router.use("/todos", todos);
router.use("/scheduledTasks", scheduledTasks);
router.get("/", (req, res) => res.send("Welcome to Taskman api"));

module.exports = router;
