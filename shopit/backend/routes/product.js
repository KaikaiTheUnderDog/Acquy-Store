const express = require('express')
const router = express.Router();


const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview, getAllProductReviews, deleteReview, getAdminProducts } = require('../controllers/productController');
const { isAuthenicatedUser, authorizedRoles } = require('../middlewares/auth')

router.route('/products').get(getProducts);

router.route('/product/:id').get(getSingleProduct);

router.route('/admin/products').get(getAdminProducts);

router.route('/admin/product/:id')
            .put(isAuthenicatedUser, authorizedRoles('admin'), updateProduct)
            .delete(isAuthenicatedUser, authorizedRoles('admin'), deleteProduct);

router.route('/admin/product/new').post(isAuthenicatedUser, authorizedRoles('admin'), newProduct);

router.route('/review').put(isAuthenicatedUser, createProductReview)
                       
router.route('/reviews').get(isAuthenicatedUser, getAllProductReviews)
                        .delete(isAuthenicatedUser, deleteReview);
                        

module.exports = router;