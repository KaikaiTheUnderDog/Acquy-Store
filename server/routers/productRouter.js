const express = require('express');
const router = express.Router();

const {
  getProducts,
  getSingleProduct,
  getBestSellers,
  isBuyByUser,
  createReview,
  addFavoriteProduct,
  removeFavoriteProduct,
} = require('../controllers/productController');

const { isAuthenticatedUser } = require('../middlewares/authentication');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router
  .route('/product/:id/favorite')
  .post(isAuthenticatedUser, addFavoriteProduct)
  .delete(isAuthenticatedUser, removeFavoriteProduct);
router.route('/products/bestsellers').get(getBestSellers);
router.route('/:id/isbuy').get(isAuthenticatedUser, isBuyByUser);
router.route('/review').put(isAuthenticatedUser, createReview);

module.exports = router;
