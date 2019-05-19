'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
  }, {
    timestamps: false
  });
  Product.associate = function(models) {
    Product.belongsToMany(models.Order, { through: models.OrderProduct });
    Product.belongsToMany(models.Cart,  { through: models.CartProduct });
  };
  return Product;
};