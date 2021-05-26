const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  req.locals = {};
  let token = req.headers.authorization;

  if (token) {
    token = token.split(" ")[1];
    try {
      req.getConnection((error, conn) => {
        const userId = jwt.verify(token, process.env.JWT_SECRET_KEY).userId;
        conn.query(
          "SELECT * FROM users WHERE id = ?",
          [userId],
          (error, user) => {
            if (error) {
              next({
                message: "There was an error while trying to verify an user",
              });
            }
            req.locals.user = user[0];
            res.status(200);
            next();
          }
        );
      });
    } catch (error) {
      next(error);
    }
  }
};
