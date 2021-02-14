module.exports = async (err, req, res, next) => {
  try {
    if (err.code === "ER_DUP_ENTRY") {
      res.json({
        error: {
          message:
            "There is already a registered user with that email, please use another email",
        },
      });
    } else {
      res.json({
        error: err,
      });
    }
  } catch (error) {
    next(error);
  }
};
