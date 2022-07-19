const router = require("express").Router();
const User = require("../Model/User");
const verify = require("./verifyToken");
const dbToken = require("../Model/token");
router.get("/", verify, async (req, res) => {
  // const info = await User.findOne({ _id: req.user });
  const info = await User.findOne({ id: req.user });
  // res.status(200).send(info);
  // res.send(req.user);
  res.json({
    info,
    posts: {
      Title: "My First-Project",
      Discription: " This is my jwt authentication project ",
    },
  });
});

router.delete("/longging-out", async (res, req) => {
  const token = req.header("auth-token");
  try {
    if (!token) {
      return res.status(402).send("token expired , logging out ");
    } else {
      const deleteToken = await dbToken.deleteOne(token);
      res.status(200).json({
        message: "logging out ",
      });
    }
  } catch (err) {
    res.json(err);
  }
});
module.exports = router;
