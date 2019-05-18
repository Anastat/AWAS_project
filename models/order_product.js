'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order_product = sequelize.define('Order_product', {
    order_id: DataTypes.UUID
  }, {});
  Order_product.associate = function(models) {
    // associations can be defined here
  };
  return Order_product;
};