module.exports = async (error, req, res, next) => {
  try {
    if (error.code === "ER_DUP_ENTRY") {
      res.json({
        error: {
          message:
            "There is already a registered user with that email, please use another email",
        },
      });
    } else {
      res.json({
        error,
      });
    }
  } catch (error) {
    next(error);
  }
};
