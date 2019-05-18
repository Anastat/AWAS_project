'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    text: DataTypes.STRING
  }, {

  });
  Review.associate = function(models) {
    // associations can be defined here
    Context.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    }),
    Context.belongsTo(models.Product, {
      foreignKey: 'product_id',
      onDelete: 'CASCADE'
    })
  };
  return Review;
};