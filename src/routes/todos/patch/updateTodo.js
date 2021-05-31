module.exports = (req, res, next) => {
  const { todoId } = req.params;
  try {
    req.getConnection((error, conn) => {
      if (error) {
        return next(error);
      }
      conn.query(
        "UPDATE todos SET status=? WHERE id=?",
        [req.body.status, todoId],
        (error) => {
          if (error) {
            return next(error);
          }
          conn.query(
            "SELECT status FROM todos WHERE id = ?",
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
