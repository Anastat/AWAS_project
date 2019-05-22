const models = require('../models')
const Product = models.Product;
const { validationResult } = require('express-validator/check');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/add-product',
    editing: false,
    errorMessage: '',
    product: null
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/add-product',
      editing: false,
      product: { title: title, price: price, imageUrl: imageUrl, description: description },
      errorMessage: errors.array()[0].msg
    });
  }
  console.log(req.body);
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(result => {
    res.redirect('/');
  })
  .catch(err =>{ console.log(err); res.redirect('/'); });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) { return res.redirect('/'); }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/edit-product',
        editing: editMode,
        product: product,
        errorMessage: ''
      });
    })
    .catch(err =>{ console.log(err); res.redirect('/'); });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const productId = req.body.productId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/edit-product',
      editing: true,
      product: { 
        title: updatedTitle, 
        price: updatedPrice, 
        imageUrl: updatedImageUrl, 
        description: updatedDesc, 
        id: productId
      },
      errorMessage: errors.array()[0].msg
    });
  }
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(result => {
      res.redirect('/');
    })
    .catch(err =>{ console.log(err); res.redirect('/'); });
};


// not tested yet
exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.prodId;
  Product.findByPk(prodId)
    .then(product => {
      product.isAvailable = false;
      product.save();
    })
    .then(() => res.redirect('/'))
    .catch(err => { console.log(err); return res.redirect('/') });
}