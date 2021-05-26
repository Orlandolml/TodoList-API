const { compose } = require("compose-middleware");
const decrypt = require("../../../middlewares/decrypt");
const authorize = require("../../../middlewares/authorize");

const handler = (req, res, next) => {
  let userId = req.locals.user.id;
  try {
    req.getConnection((error, conn) => {
      if (error) {
        return next(error);
      } else {
        conn.query(
          "SELECT * FROM scheduledTask WHERE userId = ?",
          [userId],
          (error, todos) => {
            if (error) {
              return next(error);
            } else {
              decrypt(todos, req, res);
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
