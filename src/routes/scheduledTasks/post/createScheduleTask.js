module.exports = (req, res, next) => {
  const userId = req.locals.user.id;
  let task = req.locals.encrypted;
  let iv = req.locals.iv;
  let createdAt = new Date();

  try {
    req.getConnection((error, conn) => {
      conn.query(
        "INSERT INTO scheduledTask (iv, task, userId, createdAt) VALUES (?, ?, ?, ?)",
        [iv, task, userId, createdAt],
        (error, newTodo) => {
          if (error) {
            return next(error);
          } else {
            conn.query(
              "SELECT id, status, userId, createdAt FROM scheduledTask WHERE id = ?",
              [newTodo.insertId],
              (error, todo) => {
                if (error) {
                  next(error);
                } else {
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
