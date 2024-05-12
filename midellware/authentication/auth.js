var jwt = require("jsonwebtoken");

module.exports.authentication = (req, res, next) => {
  const token = req.header("token");
  jwt.verify(token, "Nabil", function (err, decoded) {
    if (err) {
      res.json({ message: "invalid token", err });
    } else {
      req.id = decoded.userid;
      next();
    }
  });
};
