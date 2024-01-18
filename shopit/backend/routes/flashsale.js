const express = require('express');
const { newFlashsale, getFlashes } = require('../controllers/flashsaleControner');
const router = express.Router();


router.route('/admin/newflashsale').post(newFlashsale);
router.route('/flashsales').get(getFlashes);

module.exports = router;