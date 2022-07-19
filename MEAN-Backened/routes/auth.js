"use strict";
const router = require("express").Router();

const User = require("../Model/User");
const userController = require("../controller/user-controller");
const AuthToken = require("../Model/token");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const {
  validatePostUser,
  validateloginUser,
} = require("../middleware/validate-post");
const verifyToken = require("./verifyToken");

//validation

router.get("/welcome", async (req, res) => {
  try {
    const userInfo = await User.find();
    res.send(userInfo);
  } catch (err) {
    res.send(err);
  }
});

router.get("/search-user/:id", async (req, res) => {
  try {
    const idExist = await User.findById(req.params.id);
    if (!idExist) {
      res.status(404).send(" userId not found ");
    }
    const userInfo = await User.findById(req.params.id);
    res.send(userInfo);
  } catch (err) {
    res.send(err);
  }
});

router.post("/register-user", async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already email exists");

  const dataInfo = await userController.adduser(req);
  // res.send(dataInfo);

  // const user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: hashPassword,
  //   age: req.body.age,
  // });

  // try {
  //   const savedUser = await user.save();
  //   res.send({ savedUser });
  // } catch (error) {
  //   res.status(400).send(error);
  // }

  //create token & assign
  let payload = { _id: userController.adduser._id };
  const Gtoken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });

  console.log(Gtoken);
  const token = new AuthToken({
    token: Gtoken,
  });
  console.log(token);
  try {
    console.log("token is saved", dataInfo);
    dataInfo.token = Gtoken;
    const savedToken = await token.save();

    res.status(200).send(dataInfo);
  } catch (err) {
    res.status(400).send(err);
  }
});

//login
router.post("/login", async (req, res) => {
  // const { error } = validateloginUser(req.body);
  // if (error) return res.status(400).send(error);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email not found  ");

  const saltPassword = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, saltPassword);

  const validPass = await bcrypt.compare(req.body.password, hashPassword);
  if (!validPass) return res.status(400).send("invalid Password");

  //create token & assign
  let payload = { _id: user._id, name: user.name };
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });

  const userdetails = {
    name: user.name,
    email: user.email,
    token,
    age: user.age,
  };
  res.status(200).send(userdetails);
});

router.patch("/update/:id", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updateUser) {
      return res.status(404).send("user not found !");
    }
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
});

router.delete("/delete-user/:id", async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      res.status(400).send("record not exist");
    }

    res.send(deleteUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/seeDetails", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userMail = await User.findOne({ email: email });
    if (!userMail) {
      res.send("Email not found ");
    }
    res.send(userMail);
    console.log(userMail);
  } catch (err) {
    res.status(400).send("Error occured");
  }
});

router.get("/forget-password", (req, res, next) => {
  res.render("forget-password.ejs");
});

router.post("/forget-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const user = await User.findOne({ email: email });
      if (!user) {
        res.send({
          status: "failed",
          message: "Email doesn't exist ",
        });
      } else {
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const payload = {
          email: user.email,
          id: user._id,
        };
        const token = jwt.sign(payload, secret, { expiresIn: "15m" });
        const resetLink = `http://127.0.0.1:8000/api/user/reset-password/${user._id}/${token}`;
        console.log(resetLink);
        res.json({
          status: "success",
          message: "password reset-email sent .....Please check your Email ",
        });
      }
    } else {
      res.json({
        status: "failed",
        message: "Email Field is required  ",
      });
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/reset-password/:_id/:token", async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { id, token } = req.params;

  const user = User.findById(id);

  const newSecret = process.env.ACCESS_TOKEN_SECRET;
  console.log(newSecret);
  console.log(token);
  try {
    jwt.verify(token, newSecret);

    if (password && confirmPassword) {
      if (password === confirmPassword) {
        const saltPassword = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, saltPassword);
        await user.findOneAndUpdate(
          { id: user._id },
          {
            $set: { password: hashPassword },
          }
        );
        res.send({
          status: "Success",
          message: "password rest successfully ",
        });
      }
    } else {
      res.json({
        status: "failed",
        message: " password & confirm password both are required ",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

module.exports = router;
