const express = require("express");
const { dbconnections } = require("./config/dbconnections");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", require("./api/user.api"));
app.use("/messages", require("./api/message.api"));

app.use("*", (req, res) => {
  res.json("Path Is Wrong");
});

dbconnections();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
