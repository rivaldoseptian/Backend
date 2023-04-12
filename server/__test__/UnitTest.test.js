const Controller = require("../controller/controller");
const { Book, Member, Borrow } = require("../models");
const { comparePassword } = require("../helpers/bycrtp");
const { signToken } = require("../helpers/jwt");
const resetPenaltyStatus = require("../helpers/resetpenalty");

jest.mock("../models");
jest.mock("../helpers/bycrtp");
jest.mock("../helpers/jwt");
jest.mock("../helpers/resetpenalty");

describe("Controller", () => {
  describe("login", () => {
    it("should respond with 200 status and access token when valid name and password are provided", async () => {
      const req = { body: { name: "John", password: "password123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const member = { id: 1, password: "encrypted_password" };
      const access_token = "access_token";
      Member.findOne.mockResolvedValue(member);
      comparePassword.mockReturnValue(true);
      signToken.mockReturnValue(access_token);

      await Controller.login(req, res);

      expect(Member.findOne).toHaveBeenCalledWith({ where: { name: "John" } });
      expect(comparePassword).toHaveBeenCalledWith(
        "password123",
        "encrypted_password"
      );
      expect(signToken).toHaveBeenCalledWith({ id: 1 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ access_token });
    });

    it("should throw an error when name or password is missing", async () => {
      const req = { body: { name: "", password: "" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await expect(Controller.login(req, res)).rejects.toThrow({
        name: "Name/Password Not Empty",
      });
    });

    it("should throw an error when invalid name or password is provided", async () => {
      const req = { body: { name: "John", password: "password123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const member = null;
      Member.findOne.mockResolvedValue(member);

      await expect(Controller.login(req, res)).rejects.toThrow({
        name: "Invalid Name/Password",
      });
    });
  });

  describe("detail", () => {
    it("should respond with book detail when valid id is provided", async () => {
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const book = { id: 1, title: "Book 1" };
      Book.findByPk.mockResolvedValue(book);

      await Controller.detail(req, res);

      expect(Book.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(book);
    });

    it("should throw an error when invalid id is provided", async () => {
      const req = { params: { id: 999 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const book = null;
      Book.findByPk.mockResolvedValue(book);

      await expect(Controller.detail(req, res)).rejects.toThrow();
    });
  });
});
