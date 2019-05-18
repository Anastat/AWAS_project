'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartProduct = sequelize.define('CartProduct', {
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false
  });
  CartProduct.associate = function(models) {
    // associations can be defined here
  };
  return CartProduct;
};