const router = require("express").Router();
const users = require("./users");
const todos = require("./todos");
const scheduledTasks = require("./scheduledTasks");

router.use("/users", users);
router.use("/scheduledTasks", scheduledTasks);
router.use("/todos", todos);
router.use("/", (req, res) => res.json("Welcome to Taskman api"));

module.exports = router;
