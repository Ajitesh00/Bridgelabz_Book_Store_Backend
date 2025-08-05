'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.Admin, {
        foreignKey: 'admin_user_id'
      });

      Book.hasMany(models.Cart, { foreignKey: 'book_id' });
      
      Book.hasMany(models.Wishlist, { foreignKey: 'book_id' });
    }
  }

  Book.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      bookName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      discountPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      bookImage: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      admin_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'admins',
          key: 'id'
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      __v: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'Book',
      tableName: 'books'
    }
  );

  return Book;
};
