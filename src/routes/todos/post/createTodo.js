module.exports = (req, res, next) => {
  const userId = req.locals.user.id;
  let task = req.locals.encrypted;
  let iv = req.locals.iv;

  try {
    req.getConnection((error, conn) => {
      conn.query(
        "INSERT INTO todos (iv, task, userId) VALUES (?, ?, ?)",
        [iv, task, userId],
        (error, newTodo) => {
          if (error) {
            return next(error);
          } else {
            conn.query(
              "SELECT id, task, status, userId FROM todos WHERE id = ?",
              [newTodo.insertId],
              (error, todo) => {
                if (error) {
                  next(error);
                } else if (todo[0]) {
                  res.json({
                    success: true,
                    todo: { ...todo[0], task: req.body.task },
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
