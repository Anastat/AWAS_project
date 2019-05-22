const models = require('../models');
const Product = models.Product;
const Cart = models.Cart;

exports.getCart = (req, res, next) => {
  res.user
    .getCart()
    .then(cart => {
      if (!cart) return res.user.createCart({total: 0});
      return cart;
    })
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render('user/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products,
            cart: cart,
          });
        })
        .catch(err =>{ console.log(err); res.redirect('/'); });
    })
    .catch(err =>{ console.log(err); res.redirect('/'); });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  res.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
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
      return fetchedCart.addProduct(product, {through: { quantity: newQuantity }})
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err =>{ console.log(err); res.redirect('/'); });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  res.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.CartProduct.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err =>{ console.log(err); res.redirect('/'); });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  res.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return res.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(err =>{ console.log(err); res.redirect('/'); });
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err =>{ console.log(err); res.redirect('/'); });
};

exports.getOrders = (req, res, next) => {
  res.user
    .getOrders({include: ['products']})
    .then(orders => {
      res.render('user/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        isAuthenticated: true,
        orders: orders
      });
    })
    .catch(err =>{ console.log(err); res.redirect('/'); });
};
