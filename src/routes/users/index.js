const get = require("./get");
const post = require("./post");
const router = require("express").Router();

router.get("/", get.readUser);
router.post("/", post.createUser);
router.post("/login", post.login);
router.get("/validate_token", get.validateToken);

module.exports = router;
