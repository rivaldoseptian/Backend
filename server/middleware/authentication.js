const { verifyToken } = require("../helpers/jwt");
const { Member } = require("../models");

async function authentication(req, res, next) {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) throw { name: "Unauthenticated" };
    let payload = verifyToken(access_token);
    let member = await Member.findByPk(payload.id);
    req.user = {
      id: member.id,
      name: member.name,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
