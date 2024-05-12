const mongoose = require("mongoose");

module.exports.dbconnections = () => {
  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
