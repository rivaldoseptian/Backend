"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Borrow.belongsTo(models.Book, {
        foreignKey: "bookId",
      });
      Borrow.belongsTo(models.Member, {
        foreignKey: "memberId",
      });
    }
  }
  Borrow.init(
    {
      bookId: DataTypes.INTEGER,
      memberId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Borrow",
    }
  );
  return Borrow;
};
