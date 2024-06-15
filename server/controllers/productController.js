const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');

const Errors = require('../utils/errors');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Get all products -> /api/v1/products?keywords=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const productCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    message: 'This route will show all products in database',
    productsFounded: filteredProductsCount,
    totalProduct: productCount,
    resPerPage: resPerPage,
    products,
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

// Get 5 best seller products -> /api/v1/products/bestsellers
exports.getBestSellers = catchAsyncErrors(async (req, res, next) => {
  const bestSellers = await Product.find({}).sort({ sold: -1 }).limit(5).exec();

  res.status(200).json({
    success: true,
    message: 'This route will show best seller in database',
    bestSellers,
  });
});

// Check has product been buy by user -> /api/v1/:id/isBuy
exports.isBuyByUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
      'orderItems.product': req.params.id,
      orderStatus: 'Delivered',
    }).exec();

    res.status(200).json({
      isBuy: orders.length > 0,
    });
  } catch (error) {
    return next(new Errors(error.message, 500));
  }
});

// Create new review -> /api/v1/review
exports.createReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId, name } = req.body;

  const review = {
    user: req.user.id,
    rating: Number(rating),
    comment,
    name,
    userAvatar: req.user.avatar.url,
    reviewedAt: Date.now(),
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user.id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get all product's reviews --> /api/v1/:id/reviews
exports.getAllProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Add a product to the user favorites list --> /api/v1/product/:id/favorite
exports.addFavoriteProduct = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new Errors('User not found', 404));
  }

  // Check if the product is already in the favorite list
  const isFavorite = user.favoriteProducts.includes(productId);

  if (isFavorite) {
    return next(new Errors('Product is already in your favorites list', 400));
  }

  user.favoriteProducts.push(productId);
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Product added to favorites',
  });
});

// Remove a product from the user favorites list --> /api/v1/product/:id/favorite
exports.removeFavoriteProduct = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new Errors('User not found', 404));
  }

  // Check if the product is in the favorite list
  const isFavorite = user.favoriteProducts.includes(productId);

  if (!isFavorite) {
    return next(new Errors('Product is not in your favorites list', 400));
  }

  user.favoriteProducts = user.favoriteProducts.filter(
    (id) => id.toString() !== productId.toString()
  );
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Product removed from favorites',
  });
});
