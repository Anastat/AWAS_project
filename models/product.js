'use strict';
module.exports = (sequelize, DataTypes) => {
  //var original = Model.DAO.prototype.findAll;
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    isAvailable: { 
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: false
  });
  //Product.findAll = function()
  Product.associate = function(models) {
    Product.belongsToMany(models.Order, { through: models.OrderProduct });
    Product.belongsToMany(models.User,  { through: models.CartProduct });
  };
  return Product;
};