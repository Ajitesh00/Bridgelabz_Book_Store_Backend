'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    static associate(models) {
      admin.hasMany(models.Book, {
        foreignKey: 'admin_user_id'
      });
    }
  }
  admin.init(
    {
      firstName: DataTypes.STRING(100),
      lastName: DataTypes.STRING(100),
      password: DataTypes.STRING(100),
      email: DataTypes.STRING(100),
      role: {
        type: DataTypes.STRING(20),
        defaultValue: 'admin',
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Admin',
      tableName: 'admins'
    }
  );
  return admin;
};