const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../emailconfig/user.email");
const { model } = require("mongoose");
const { use } = require("../api/message.api");

module.exports.signUp = async (req, res) => {
  const { name, email, password, age } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    res.json({ message: "Email Already Exist" });
  } else {
    let token = jwt.sign({ email }, "na", { expiresIn: 60 });
    await sendEmail({ email, token });
    bcrypt.hash(password, 4, async function (err, hash) {
      // Store hash in your password DB.
      await userModel.insertMany({ name, email, password: hash, age });
      res.json({ message: "Success" });
    });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      //login
      let token = jwt.sign({ role: "user", userid: user._id }, "Nabil");
      if (user.emailConfirm == true) {
        res.json({ message: "Login", token });
      } else {
        res.json({ message: "confirm  email first" });
      }
    } else {
      res.json("Password Incorrect");
    }
  } else {
    res.json("Email dose't Exist");
  }
};

module.exports.emailVerify = async (req, res) => {
  const { token } = req.params;
  jwt.verify(token, "na", async (err, decode) => {
    if (err) {
      res.json({ message: "invalid token", err });
    } else {
      let users = await userModel.findOne({ email: decode.email });
      if (users) {
        await userModel.findOneAndUpdate(
          { email: decode.email },
          { emailConfirm: true }
        );
        res.json({ message: "Verifyed" });
      } else {
        res.json({ message: "failed verifyed" });
      }
    }
  });
};
