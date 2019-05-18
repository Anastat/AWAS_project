'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    quantity: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  OrderProduct.associate = function(models) {
    // associations can be defined here
  };
  return OrderProduct;
};