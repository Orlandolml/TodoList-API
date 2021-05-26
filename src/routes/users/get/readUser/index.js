const { compose } = require("compose-middleware");
const authorize = require("../../../../middlewares/authorize");

const handler = (req, res, next) => {
  try {
    let user = req.locals.user;
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports = compose([authorize, handler]);
