const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = (req, res, next) => {
  try {
    const userBody = req.body;

    req.getConnection((error, conn) => {
      if (error) {
        return next(error);
      } else {
        conn.query(
          "SELECT id, password FROM users WHERE email = ?",
          [userBody.email],
          (error, user) => {
            if (!user.length || error) {
              next({
                message: error
                  ? error.message
                  : "There is still no registered user with that email, please login",
              });
            } else {
              let data = user[0];
              if (bcrypt.compare(userBody.password, data.password)) {
                res.json({
                  success: true,
                  token: jwt.sign(
                    { userId: data.id },
                    process.env.JWT_SECRET_KEY,
                    {
                      expiresIn: 60 * 60 * 6,
                    }
                  ),
                });
              }
            }
          }
        );
      }
    });
  } catch (error) {
    next(error);
  }
};
