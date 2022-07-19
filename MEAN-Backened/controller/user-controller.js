const User = require("../Model/User");
const bcrypt = require("bcrypt");

// creating a user in data base

let adduser = async (req) => {
  //salt & Hash password
  const saltPassword = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, saltPassword);

  const newuser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    age: req.body.age,
  });
  return await newuser.save();
};

module.exports = { adduser };
