const crypto = require("crypto");
const { compose } = require("compose-middleware");
const authorize = require("../../middlewares/authorize");

const handler = (req, res, next) => {
  let text = req.body.task;

  crypto.scrypt(process.env.CRYPTO_SECRET_KEY, "salt", 24, (error, key) => {
    //create an initialization vector
    if (error) throw error;
    crypto.randomFill(new Uint8Array(16), (error, iv) => {
      if (error) throw error;
      const cipher = crypto.createCipheriv(
        process.env.CRYPTO_ALGORITHM,
        key,
        iv
      );

      cipher.setEncoding("hex");
      let encrypted = "";

      cipher.on("data", (chunk) => {
        encrypted += chunk;
        req.locals.encrypted = encrypted;
        req.locals.iv = iv.toString();
      });
      cipher.on("end", () => next());
      cipher.on("error", (error) => {
        throw error;
      });

      cipher.write(text);
      cipher.end();
    });
  });
};

module.exports = compose([authorize, handler]);
