const messageModel = require("../models/message.model");

module.exports.add = async (req, res) => {
  const { message } = req.body;
  await messageModel.insertMany({ message, userid: req.id });
  res.json({ message: "Adedd" });
};

module.exports.getMsg = async (req, res) => {
  const { userid } = req.body;
  let msg = await messageModel.find({ userid }, { message: 1, _id: 0 });
  res.json({ message: "Ok", msg });
};
