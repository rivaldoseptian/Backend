let bcrypt = require("bcryptjs");

const hashPassword = (password) => bcrypt.hashSync(password, 8);
const comparePassword = (password, PasswordHash) =>
  bcrypt.compareSync(password, PasswordHash);

module.exports = {
  hashPassword,
  comparePassword,
};
