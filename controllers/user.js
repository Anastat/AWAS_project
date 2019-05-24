const models = require('../models');
const Product = models.Product;
const User = models.User;
const Order = models.Order;

const { validationResult } = require('express-validator/check');

exports.getCart = (req, res, next) => {
  res.user
    .getProducts()
      .then(products => {
        res.render('user/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
        total: products.reduce((a, b) => a + b.price * b.CartProduct.quantity, 0)
      });
    })
    .catch(err =>{ console.log(err); res.redirect('/'); });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let newQuantity = 1;
  res.user
    .getProducts({ where: { id: prodId } })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.CartProduct.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return res.user.addProducts(product, {through: { quantity: newQuantity }})
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err =>{ console.log(err); res.redirect('/'); });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  res.user
    .getProducts({ where: { id: prodId } })
    .then(products => {
      const product = products[0];
      return product.CartProduct.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err =>{ console.log(err); res.redirect('/cart'); });
};

exports.postOrder = (req, res, next) => {
  const total = req.body.total || null;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array())
    return res.render('user/checkout', {
      errorMessage: errors.array()[0].msg,
      total: total,
      pageTitle: 'Your Order',
      path: '/cart'
    });
  }
  res.user
    .getProducts()
    .then(products => {
      console.log(products);
      return res.user
        .createOrder()
        .then(order => {
          console.log(order);
          order.total = total;
          return order.save();
        })
        .then(order => {
          console.log(products);
          return order.addProducts(
            products.map(product => {
              product.OrderProduct = { quantity: product.CartProduct.quantity };
              return product;
            })
          );
        })
        .catch(err =>{ console.log(err); res.redirect('/'); });
    })
    .then(result => {
      return res.user.setProducts(null);
    })
    .then(result => {
      return res.render('user/checkout', {
        errorMessage: null,
        total: total,
        pageTitle: 'Your Order',
        path: '/cart'
      });
    })
    .catch(err =>{ console.log(err); res.redirect('/'); });
};

exports.getOrders = (req, res, next) => {
  res.user
    .getOrders({include: ['Products']})
    .then(orders => {
      res.render('user/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err =>{ console.log(err); res.redirect('/'); });
};
