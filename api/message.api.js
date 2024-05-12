const { authentication } = require("../midellware/authentication/auth");
const { add, getMsg } = require("../services/message.service");

const app = require("express").Router();

app.post("/", add);
app.get("/", authentication, getMsg);

module.exports = app;
