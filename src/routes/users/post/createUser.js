const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const userBody = req.body;
    let password = userBody.password;
    userBody.password = await bcrypt.hash(password, 10);

    req.getConnection((error, conn) => {
      if (error) {
        return next(error);
      } else {
        conn.query(
          "INSERT INTO users set ?",
          [userBody],
          (error, insertedUser) => {
            if (error) {
              return next(error);
            } else {
              conn.query(
                "SELECT * FROM users WHERE id = ?",
                [insertedUser.insertId],
                (error, user) => {
                  if (error) {
                    return next(error);
                  } else {
                    res.json({
                      success: true,
                      token: jwt.sign(
                        { userId: user[0].id },
                        process.env.JWT_SECRET_KEY,
                        {
                          expiresIn: 60 * 60 * 6,
                        }
                      ),
                    });
                  }
                }
              );
            }
          }
        );
      }
    });
  } catch (error) {
    next(error);
  }
};
