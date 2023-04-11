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

module.exports = authorization;
