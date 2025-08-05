  'use strict';
  const { Model } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class user extends Model {
      static associate(models) {
        // define association here
        user.hasMany(models.Cart, { foreignKey: 'user_id' });
        
        user.hasMany(models.Wishlist, { foreignKey: 'user_id' });
      }
    }
    user.init(
      {
        firstName: {
          type: DataTypes.STRING(100)
        },
        lastName: {
          type: DataTypes.STRING(100)
        },
        password: {
          type: DataTypes.STRING(100)
        },
        email: {
          type: DataTypes.STRING(100)
        },
        role: {
          type: DataTypes.STRING(20),
          defaultValue: 'user',
          allowNull: false
        },

      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users'
      }
    );
    return user;
  };
