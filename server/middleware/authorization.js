const { Borrow } = require("../models");

async function authorization(req, res, next) {
  try {
    let bookId = req.params.id;
    let borrow = await Borrow.findOne({ where: { bookId } });
    if (req.user.id !== borrow.memberId) {
      throw { name: "Forbiden" };
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function authorizationBorrow(req, res, next) {
  try {
    const id = req.user.id;
    const borrow = await Borrow.findAll({ where: { memberId: id } });
    if (borrow.length >= 2) throw { name: "Can only Borrow 2 Books" };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authorization, authorizationBorrow };
