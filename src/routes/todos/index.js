const get = require("./get");
const post = require("./post");
const patch = require("./patch");
const deleteRoute = require("./delete");
let router = require("express").Router();

router.post("/", post.createTodo);
router.get("/", get.readTodos);
router.patch("/:todoId", patch.updateTodo);
router.delete("/:todoId", deleteRoute.deleteTodo);

module.exports = router;
