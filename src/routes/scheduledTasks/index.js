const post = require("./post");
const get = require("./get");
const patch = require("./patch");
const deleteRoute = require("./delete");
let router = require("express").Router();
const encrypt = require("../../middlewares/encrypt");

router.get("/", get.getScheduledTasks);
router.post("/", encrypt, post.createScheduledTask);
router.delete("/:taskId", deleteRoute.deleteScheduledTask);
router.patch("/:taskId", encrypt, patch.updateScheduledTask);

module.exports = router;
