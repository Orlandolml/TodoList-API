const authorize = require("../../../middlewares/authorize");
const { compose } = require("compose-middleware");

const handler = (req, res, next) => {
  const { todoId } = req.params;
  const userId = req.locals.user.id;

  try {
    req.getConnection((error, conn) => {
      if (error) {
        return next(error);
      } else {
        conn.query(
          "DELETE FROM todos WHERE id = ? AND userId = ?",
          [todoId, userId],
          (error, deletedTodo) => {
            if (error) {
              return next(error);
            } else if (deletedTodo.affectedRows > 0) {
              res.json({
                success: true,
                message: "Todo deleted successfully!",
              });
            } else {
              next({
                success: false,
                message: "There is no task with that id",
              });
            }
          }
        );
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = compose([authorize, handler]);
