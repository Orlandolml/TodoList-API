const crypto = require("crypto");

module.exports = (todos, req, res) => {
  //Convert for function to work
  Promise.allSettled(
    todos.reverse().map((todo) => {
      return new Promise((res, rej) => {
        todo.iv = Uint8Array.from(todo.iv.split(","));
        crypto.scrypt(
          process.env.CRYPTO_SECRET_KEY,
          "salt",
          24,
          (error, key) => {
            if (error) throw error;
            //Create decipher object
            const decipher = crypto.createDecipheriv(
              process.env.CRYPTO_ALGORITHM,
              key,
              todo.iv
            );

            let decrypted = "";
            decipher.on("readable", (chunk) => {
              while (null !== (chunk = decipher.read())) {
                decrypted += chunk.toString("utf8");
              }
            });
            decipher.on("end", () => {
              res(decrypted);
            });
            decipher.write(todo.task, "hex");
            decipher.end();
          }
        );
      });
    })
  ).then((todosDecrypted) => {
    let todos = todosDecrypted.map((todo) => {
      return todo.value;
    });
    res.json({ success: true, todos });
  });
};
