"use strict";
const Ajv = require("ajv");
const userschema = require("../schema/users");

function validatePostUser(res, req, next) {
  const ajv = new Ajv();
  const validate = ajv.compile(userschema.postSchemaRegister);

  const valid = validate(req.body);
  if (!valid) {
    const errors = validate.errors;
    res.status(400).json(errors);
  }
  next();
}

function validateloginUser(req, res, next) {
  const ajv = new Ajv();
  const validate = ajv.compile(userschema.postSchemaLogin);

  const valid = validate(req.body);
  if (!valid) {
    const errors = validate.errors;
    res.status(400).json(errors);
  }
  next();
}
module.exports = { validateloginUser, validatePostUser };
