'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    total: { type: DataTypes.FLOAT, allowNull: false, defaultValue: '0' }
  }, {
    timestamps: false
  });
  Cart.associate = function(models) {
    Cart.belongsTo(models.User, { onDelete: "CASCADE", foreignKey: { allowNull: false } });
    Cart.belongsToMany(models.Product, { through: models.CartProduct });
  };
  return Cart;
};