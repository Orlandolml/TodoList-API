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
              res.json({
                success: true,
                payload: todo[0],
              });
            }
          );
        }
      );
    });
  } catch (error) {
    next(error);
  }
};
