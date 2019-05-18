'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Context, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    })
  };
  return User;
};