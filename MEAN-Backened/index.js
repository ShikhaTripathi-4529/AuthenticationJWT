"use strict";
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//import routes
const authRoute = require("./routes/auth");
const postroute = require("./routes/posts");
const { urlencoded } = require("body-parser");

dotenv.config({ path: "./routes/.env" });

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// using route  middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postroute);
// app.set("view engine", "ejs");
// app.engine("ejs", require("ejs").__express);
app.listen(8000, () => {
  console.log("port is listening at 8000");
});
