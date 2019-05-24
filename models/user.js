'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username:  {
      type: DataTypes.STRING,
      primaryKey: true
    },
    password: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN
  }, {
    timestamps: false
  })
  User.associate = function(models) {
    User.belongsToMany(models.Product, { through: models.CartProduct } );
    User.hasMany(models.Order, { onDelete: 'CASCADE', foreignKey: { allowNull: true } });
  };
  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10).then(hash => { user.password = hash; });
  });
  User.beforeBulkCreate((records, {fields}) => {
    for (const user of records) user.password = bcrypt.hashSync(user.password, 10);
  });
  User.prototype.validPassword = function validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }  
  return User;
};