"use strict";
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!verified) {
      res.send("token expired or not found relogin again ");
    }
    req.user = verified;
    // console.log(verified);
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

///////////////Authenticating admin /////////////////
// module.exports = function (req, res, next) {
//   try {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];

//     if (!token)
//       return SendResponse(res, {}, "Access denied, no token found", 400);

//     let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); //jwt verify the token and returns payload
//     req.decodedData = decoded; //doubt
//     next();
//   } catch (error) {
//     return SendResponse(res, {}, "Invalid token", 400);
//   }
// };
