require("express");
const userModel = require("../Model/User");

//foregt password
module.exports = async function forgetPassword(req, res) {
  let { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const resetToken = user.createResetToken();
      //    ---    http://abc.com//resetpassword/reset/token
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}//resetpassword${resetToken}`;
    } else {
      return res.json({
        message: "email not found , please sign-up",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = async function resetpassword(req, res) {
  try {
    const token = req.params.body;
    let { password, confirmpassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      user.resetPasswordHandler(password, confirmpassword);
      await user.save();
      res.json({
        message: "password change successfully, return to login ",
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
