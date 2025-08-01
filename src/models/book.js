'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // define associations if needed
      Book.belongsTo(models.Admin, {
        foreignKey: 'admin_user_id'
      });
    }
  }

  Book.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      description: DataTypes.TEXT,
      discountPrice: DataTypes.INTEGER,
      bookImage: DataTypes.TEXT,
      admin_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'admins',
          key: 'id'
        }
      },
      bookName: DataTypes.TEXT,
      author: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      __v: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Book',
      tableName: 'books'
    }
  );

  return Book;
};
