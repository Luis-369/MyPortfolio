/* jshint indent: 2 */

const { NOW } = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    FirstName: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    LastName: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    UserName: {
      type: DataTypes.STRING(16),
      allowNull: true,
      unique: true
    },
    Password: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(128),
      allowNull: true,
      unique: true
    },
    Admin: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    // CreatedAt: {
    //   type: DataTypes.DATEONLY,
    //   allowNull: false
    // },
    // UpdatedAt: {
    //   type: DataTypes.DATEONLY,
    //   allowNull: false
    // }
  }, {
    tableName: 'users'
  });
};
