module.exports = (req, res, next) => {
  const { taskId } = req.params;
  const userId = req.locals.user.id;
  const { iv, encrypted } = req.locals;
  try {
    req.getConnection((error, conn) => {
      if (error) {
        return next(error);
      }
      conn.query(
        "UPDATE scheduledTask SET iv = ?, task = ? WHERE id = ? AND userId = ?",
        [iv, encrypted, taskId, userId],
        (error) => {
          if (error) {
            return next(error);
          }
          conn.query(
            "SELECT * FROM scheduledTask WHERE id = ?",
            [taskId],
            (error, todo) => {
              if (error) {
                return next(error);
              }
              if (todo[0]) {
                res.json({
                  success: true,
                  payload: todo[0],
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
