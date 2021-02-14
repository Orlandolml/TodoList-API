const { compose } = require("compose-middleware");
const authorize = require("../../../../middlewares/authorize");

const handler = (req, res, next) => {
  res.json({
    success: true,
  });
};

module.exports = compose([authorize, handler]);
