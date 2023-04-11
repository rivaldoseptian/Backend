const { comparePassword } = require("../helpers/bycrtp");
const { signToken } = require("../helpers/jwt");
const { Book, Member, Borrow } = require("../models");

class Controller {
  static async login(req, res, next) {
    try {
      const { name, password } = req.body;
      if (!name || !password) throw { name: "Name/Password Not Empty" };
      const member = await Member.findOne({
        where: {
          name,
        },
      });
      if (!member) throw { name: "Invalid Name/Password" };
      const isPassword = comparePassword(password, member.password);
      if (!isPassword) throw { name: "Invalid Name/Password" };
      const payload = {
        id: member.id,
      };
      const access_token = signToken(payload);
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const { id } = req.params;
      const book = await Book.findByPk(id);
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }

  static async borowBook(req, res, next) {
    try {
      const idBook = req.params.id;
      const { id } = req.user;
      const book = await Book.findByPk(idBook);
      if (book.stock === 0) throw { name: "The Book is Being Borrowed" };
      const borrow = await Borrow.create({ bookId: idBook, memberId: id });
      await Book.update({ stock: 0 }, { where: { id: idBook } });
      res.status(201).json(borrow);
    } catch (error) {
      next(error);
    }
  }

  static async returnBooks(req, res, next) {
    try {
      const idBook = req.params.id;
      const borrow = await Borrow.destroy({ where: { bookId: idBook } });
      await Book.update({ stock: 1 }, { where: { id: idBook } });
      res.status(200).json({ message: "Succes Return Books" });
    } catch (error) {
      next(error);
    }
  }

  static async detailMember(req, res, next) {
    try {
      const id = req.user.id;
      const borrow = await Borrow.findAll({
        where: { memberId: id },
        include: [Book],
      });
      res.status(200).json(borrow);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
