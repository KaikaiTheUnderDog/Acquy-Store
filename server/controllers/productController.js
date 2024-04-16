const Product = require('../models/product');

const Errors = require('../utils/errors');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Get all products -> /api/v1/products?keywords=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const productCount = await Product.countDocuments();

  console.log(req.query);

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.query.clone();

  const bestSellers = await Product.find({}).sort({ sold: -1 }).limit(5).exec();

  res.status(200).json({
    success: true,
    message: 'This route will show all products in database',
    productsFounded: filteredProductsCount,
    totalProduct: productCount,
    resPerPage: resPerPage,
    products,
    bestSellers,
  });
});

// Get a single product -> /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errors('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Product found',
    product,
  });
});
