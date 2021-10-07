/* jshint indent: 2 */
// const Sequelize = require('sequelize');


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PostTitle: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    PostBody: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'UserId'
      }
    },
    CreatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    UpdatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'posts'
  });
};


