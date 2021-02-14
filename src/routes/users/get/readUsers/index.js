module.exports = (req, res, next) => {
  try {
    req.getConnection((err, conn) =>
      conn.query("SELECT * FROM users", (err, users) => {
        if (error) {
          return next(error);
        }
        res.json({ succes: true, users });
      })
    );
  } catch (error) {
    next(error);
  }
};
