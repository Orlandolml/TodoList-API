const { compose } = require("compose-middleware");
const authorize = require("../../../middlewares/authorize");

const handler = (req, res, next) => {
  const userId = req.locals.user.id;
  const date = new Date();
  try {
    req.getConnection((error, conn) => {
      conn.query(
        "INSERT INTO todos (task, userId, createdAt) VALUES (?, ?, ?)",
        [req.body.task, userId, date],
        (error, newTodo) => {
          if (error) {
            return next(error);
          } else {
            conn.query(
              "SELECT * FROM todos WHERE id = ?",
              [newTodo.insertId],
              (error, todo) => {
                if (error) {
                  next(error);
                } else {
                  res.json({
                    success: true,
                    todo: todo[0],
                  });
                }
              }
            );
          }
        }
      );
    });
  } catch (error) {
    next(error);
  }
};

module.exports = compose([authorize, handler]);
