const jwt = require("jsonwebtoken");
//create token & assign
module.exports = function (req, res, next) {
  let payload = { _id: userController.adduser._id };
  const Gtoken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  console.log(Gtoken);
  const token = new AuthToken({
    token: Gtoken,
  });
  console.log(token);
};
