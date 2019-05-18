'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    total: DataTypes.FLOAT
  }, {
    timestamps: false
  });
  Order.associate = function(models) {
    Order.belongsTo(models.User, { onDelete: "CASCADE", foreignKey: { allowNull: false } });
    Order.belongsToMany(models.Product, { through: models.OrderProduct });
  };
  return Order;
};