module.exports = (req, res, next) => {
  const { todoId } = req.params;
  const userId = req.locals.user.id;
  const { iv, encrypted } = req.locals;
  try {
    req.getConnection((error, conn) => {
      if (error) {
        return next(error);
      }
      conn.query(
        "UPDATE todos SET iv = ?, task = ? WHERE id = ? AND userId = ?",
        [iv, encrypted, todoId, userId],
        (error) => {
          if (error) {
            return next(error);
          }
          conn.query(
            "SELECT * FROM todos WHERE id = ?",
            [todoId],
            (error, todo) => {
              if (error) {
                return next(error);
              }
              if (todo[0]) {
                res.json({
                  success: true,
                  payload: todo[0],
                });
              } else {
                res.json({
                  success: false,
                  message: "There is no a task with that id",
                });
              }
            }
          );
        }
      );
    });
  } catch (error) {
    next(error);
  }
};
