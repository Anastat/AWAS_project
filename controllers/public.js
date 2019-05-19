const models = require('../models');
const Product = models.Product;

exports.getIndex = (req, res, next) => {
  const query = req.query.q;
  function render(products) {
    res
    .set('X-XSS-Protection', 0)
    .render('public/index', {
      prods: products,
      query: query,
      pageTitle: 'search',
      path: '/'
    });
  }

  if (query) { 
    return Product.findAll({where: {
      title: { [models.Sequelize.Op.iLike]: query+'%' } } 
    })
    .then(products => render(products))
    .catch(err => console.log(err));
  } else { 
  Product.findAll()
    .then(products => {
      res.render('public/index', {
        prods: products,
        query: query,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
};

exports.getProduct = (req, res, next) => {
  const prodId = req.query.productId;
  Product.findByPk(prodId)
    .then(product => {
      res.render('public/product-detail', {
        product: product,
        pageTitle: 'product-detail',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};