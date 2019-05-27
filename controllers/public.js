const models = require('../models');
const Product = models.Product;
const Browser = require('zombie');
const Fetch = require('zombie/lib/fetch');

exports.getIndex = (req, res, next) => {
  const query = req.query.q;
  function render(products) {
    res
    .set('X-XSS-Protection', 0)
    .render('public/index', {
      prods: products,
      query: query,
      flag: null,
      pageTitle: 'search',
      path: '/'
    });
  }

  if (query) { 
    return Product.findAll({
      where: models.Sequelize.and(
        { title: { [models.Sequelize.Op.iLike]: query+'%' } },
        { isAvailable: true }
      ) 
    })
    .then(products => render(products))
    .catch(err => { console.log(err); return res.redirect('/') });
  } else { 
    const bruteforcingUsername = [ "BAILEY16", "calltopower1", "aaawsome2" ];
    var flag = res.user && bruteforcingUsername.includes(res.user.username) ? 
      "FLAG:M4YTHeBruT3F0RCEB3W1THU": null;
    Product.findAll({
      where: { isAvailable: true }
    })
      .then(products => {
        res.render('public/index', {
          prods: products,
          query: query,
          pageTitle: 'Shop',
          flag: flag,
          path: '/'
        });
      })
      .catch(err => { console.log(err); return res.redirect('/') });
  }
};

exports.getProduct = (req, res, next) => {
  const prodId = req.query.productId;
  /* 
    Valid SQL injection: 1 and 1=1 UNION SELECT null, username, null, password, null, null FROM "Users"
    ENCODED: 1%20and%201=1%20UNION%20SELECT%20null,%20username,%20null,%20password,%20null,%20null%20FROM%20%22Users%22
  */
  models.sequelize.query('SELECT * FROM "Products" WHERE "isAvailable" AND id='+prodId,
    { type: models.sequelize.QueryTypes.SELECT }
  ).then(product => {
    //console.log(product);
    res.render('public/product-detail', {
      product: product[0],
      pageTitle: 'product-detail',
      path: '/',
      error: null,
    });
  })
  .catch(err => { 
    console.log(err);
    res.render('public/product-detail', {
      product: { id: '', title: '',
        price: '', description: '',
        imageUrl: '', isAvailable: true },
      error: err,
      pageTitle: 'product-detail',
      path: '/'
    });
  });
};

exports.getReportPage = (req, res, next) => {
  return res.render('public/report', { 
    pageTitle: 'product-report',
    path: '/report',
    complete: false 
  });
}

exports.postReportPage = (req, res, next) => {
  var testurl = req.body.url;
  res.render('public/report', { 
    pageTitle: 'product-report',
    path: '/report',
    complete: true 
  });
  var validUrlRegex = new RegExp("^http(s)?:\/\/" + req.get('host'));
  if ( testurl && validUrlRegex.test(testurl) ) {
    var redirections = 0;
    var browser = new Browser();
    // limit max redirections to 1 hop
    browser.pipeline.addHandler((browser, request) => {
      if(redirections > 1) return new Fetch.Response('', { status: 200 });
      redirections++;
    })
    browser.setCookie({ name: 'FLAG', domain: req.hostname, value: 'FLAG:1R3fl3ctLiK3AM1RR0R' });
    browser.visit(testurl,
      { runScripts: true },
      function (err) {
        if (err) { console.log('Error:' + err.message); }
        else { console.log(browser.cookies); console.log('Page loaded successfully'); }
    });
  }
}