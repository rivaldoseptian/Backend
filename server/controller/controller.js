const { comparePassword } = require("../helpers/bycrtp");
const { signToken } = require("../helpers/jwt");
const resetPenaltyStatus = require("../helpers/resetpenalty");
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
      if (member.updatedAt) {
        resetPenaltyStatus(member.id);
      }
      const access_token = signToken(payload);
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async borowBook(req, res, next) {
    try {
      const idBook = req.params.id;
      if (!idBook) throw { name: "Not found" };
      const { id } = req.user;
      const member = await Member.findByPk(id);
      if (member.penalty === true) throw { name: "can't borrow books" };
      const book = await Book.findByPk(idBook);
      if (book.stock === 0) throw { name: "The Book is Being Borrowed" };
      const borrow = await Borrow.create({ bookId: idBook, memberId: id });
      await Book.update({ stock: 0 }, { where: { id: idBook } });
      res.status(201).json(borrow);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async returnBooks(req, res, next) {
    try {
      const idBook = req.params.id;
      const borrow = await Borrow.findOne({ where: { bookId: idBook } });
      const returnDate = new Date();
      const dueDate = new Date(borrow.createdAt);
      const daysLate = Math.floor(
        (returnDate - dueDate) / (1000 * 60 * 60 * 24)
      );
      if (daysLate > 7) {
        const memberId = borrow.memberId;
        await Member.update({ penalty: true }, { where: { id: memberId } });
      }
      await Borrow.destroy({ where: { bookId: idBook } });
      await Book.update({ stock: 1 }, { where: { id: idBook } });
      res.status(200).json({ message: "Succes Return Books" });
    } catch (error) {
      next(error);
    }
  }

  static async detailborrow(req, res, next) {
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

  static async showBooks(req, res, next) {
    try {
      const book = await Book.findAll({ where: { stock: 1 } });
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }

  static async showMember(req, res, next) {
    try {
      const members = await Member.findAll({
        attributes: { exclude: ["password"] },
        include: [Borrow],
      });

      const result = members.map((member) => {
        const BookLoanAmount = member.Borrows ? member.Borrows.length : 0;
        return { ...member.toJSON(), BookLoanAmount };
      });

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
