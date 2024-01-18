const FlashSale = require('../models/flashsale')
const catchAsyncError = require('../middlewares/catchAsyncError')


exports.newFlashsale = catchAsyncError(async (req, res, next) => {

  const flashsale = await FlashSale.create(req.body);

  res.status(201).json({
    success: true,
    flashsale
  })
});



exports.getFlashes = catchAsyncError(async (req, res, next) => {
  const flashsaleCount = await FlashSale.countDocuments();
  const flashsales = await FlashSale.find();

  res.status(200).json({
    success: true,
    flashsaleCount,
    flashsales,
   
  });
})

