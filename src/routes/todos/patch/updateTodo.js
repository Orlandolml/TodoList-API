const authorize = require("../../../middlewares/authorize");
const { compose } = require("compose-middleware");

const handler = (req, res, next) => {
  const userId = req.locals.user.id;
  const { todoId } = req.params;
  try {
    req.getConnection((error, conn) => {
      if (error) {
        return next(error);
      }
      conn.query(
        "UPDATE todos SET ? WHERE id = ? AND userId = ?",
        [req.body, todoId, userId],
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

module.exports = compose([authorize, handler]);
