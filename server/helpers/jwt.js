const jwt = require("jsonwebtoken");

const KEY = "septian";

const signToken = (payload) => jwt.sign(payload, KEY);
const verifyToken = (token) => jwt.verify(token, KEY);

module.exports = {
  signToken,
  verifyToken,
};
