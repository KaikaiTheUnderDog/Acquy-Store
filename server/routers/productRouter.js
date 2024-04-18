const express = require('express');
const router = express.Router();

const {
  getProducts,
  getSingleProduct,
  getBestSellers,
} = require('../controllers/productController');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/products/bestsellers').get(getBestSellers);

module.exports = router;
