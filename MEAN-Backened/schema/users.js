const Ajv = require("ajv");

const postSchemaRegister = {
  type: "object",
  properties: {
    email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
    name: { type: "string" },
    password: {
      type: "string",
      pattern: "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$",
    },
    age: { type: "number" },
  },
  required: ["email", "name", "password"],
  additionalProperties: false,
};

const postSchemaLogin = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: {
      type: "string",

      // pattern: "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$",
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

// module.exports = { registrationValidation };
module.exports.postSchemaRegister = postSchemaRegister;
module.exports.postSchemaLogin = postSchemaLogin;
