const models = require('../models');
const Product = models.Product;
const Cart = models.Cart;

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      res.render('public/product-detail', {
        product: product,
        isAuthenticated: true,
        pageTitle: product.title,
        path: '/'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      console.log(res.local);
      res.render('public/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  res.user
    .getCart()
    .then(cart => {
      if (!cart) return req.user.createCart({total: 0});
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
            isAuthenticated: true,
          });
        })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  const prodPrice = req.body.prodPrice;
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
      fetchedCart.total = (fetchedCart.total || 0 )+ prodPrice;
      fetchedCart.save();
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
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
    .catch(err => console.log(err));
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
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
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
    .catch(err => console.log(err));
};
