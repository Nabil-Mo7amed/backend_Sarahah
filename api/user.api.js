const { userValidation } = require("../midellware/validation/valid");
const { signUp, signIn, emailVerify } = require("../services/user.service");

const app = require("express").Router();

app.post("/signup", signUp);
app.post("/signin", signIn);
app.get("/verify/:token", emailVerify);

module.exports = app;
