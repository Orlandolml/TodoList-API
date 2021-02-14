const authorize = require("../../../middlewares/authorize");
const { compose } = require("compose-middleware");

const handler = (req, res, next) => {
  const userId = req.locals.user.id;
  try {
    req.getConnection((error, conn) => {
      conn.query(
        "SELECT * FROM todos WHERE userId = ?",
        [userId],
        (error, todos) => {
          if (error) {
            next(error);
          } else {
            res.json({
              success: true,
              payload: todos,
            });
          }
        }
      );
    });
  } catch (error) {
    next(error);
  }
};

module.exports = compose([authorize, handler]);
