const post = require("./post");
const patch = require("./patch");
const get = require("../todos/get");
const deleteRoute = require("./delete");
let router = require("express").Router();
const encrypt = require("../../middlewares/encrypt");

router.get("/", get.readTodos);
router.post("/", encrypt, post.createTodo);
router.patch("/:todoId", encrypt, patch.updateTodo);
router.delete("/:todoId", deleteRoute.deleteTodo);

module.exports = router;
