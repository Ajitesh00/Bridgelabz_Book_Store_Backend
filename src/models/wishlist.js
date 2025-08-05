'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    static associate(models) {
      Wishlist.belongsTo(models.User, { foreignKey: 'user_id' });
      Wishlist.belongsTo(models.Book, { foreignKey: 'book_id' });
    }
  }

  Wishlist.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      book_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: 'books', key: 'id' },
      },
    },
    {
      sequelize,
      modelName: 'Wishlist',
      tableName: 'wishlists',
      timestamps: true,
    }
  );

  return Wishlist;
};