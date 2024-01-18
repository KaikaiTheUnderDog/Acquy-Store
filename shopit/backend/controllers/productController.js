const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler')

const catchAsyncError = require('../middlewares/catchAsyncError')

const APIFeature = require("../utils/apiFeature")
const cloudinary = require("cloudinary")

exports.newProduct = catchAsyncError(async (req, res, next) => {
  const images = req.body.images

  const result = await cloudinary.v2.uploader.upload(images, { folder: 'products' })
  const imagesLink = {
    public_id: result.public_id,
    url: result.secure_url
  }

  req.body.images = imagesLink

  req.body.info = JSON.parse(req.body.info);

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product
  })
});



exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 8;
  const productCount = await Product.countDocuments();

  const apiFeature = new APIFeature(Product.find(), req.query).search().filter()

  let products = await apiFeature.query.clone();
  let filteredProductsCount = products.length

  apiFeature.pagination(resPerPage)
  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    productCount,
    resPerPage,
    products,
    filteredProductsCount
  });
})

exports.getAdminProducts = catchAsyncError(async (req, res, next) => {

  const products = await Product.find();

  res.status(200).json({
    success: true,
    products
  })

})


exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product
  })
})


exports.updateProduct = catchAsyncError(async (req, res, next) => {

  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  let images
  if (typeof req.body.images === 'string') {
    images = req.body.images
  }

  if (images !== undefined) {
    await cloudinary.v2.uploader.destroy(product.images.public_id, { folder: 'products' })

    result = await cloudinary.v2.uploader.upload(images, { folder: 'products' })
    const imagesLink = {
      public_id: result.public_id,
      url: result.secure_url
    }
    req.body.images = imagesLink
  }
  req.body.info = JSON.parse(req.body.info);

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
  new: true,
  runValidators: true,
  useFindAndModify: false
});

res.status(200).json({
  success: true,
  product
})
})


exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "product has been deleted"
  })
});


exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    rating: Number(rating),
    comment,
    productId,
    user: req.user._id,
    name: req.user.name,
  };

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let isReviewed = product.reviews.find(
    r => r.user.toString() === req.user._id.toString()
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

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'Review created successfully',
    review,
  });
});

exports.getAllProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    message: 'This route will show all reviews',
    reviews: product.reviews,
  });
});

exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const rating =
    product.reviews.reduce((acc, review) => review.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: 'Review deleted successfully',
    reviews: product.reviews,
  });
});