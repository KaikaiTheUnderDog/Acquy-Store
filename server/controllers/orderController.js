const Order = require('../models/order');

const Errors = require('../utils/errors');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new Order --> /api/v1/order/new
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paymentMethod,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paymentMethod,
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    message: 'Order created successfully',
    order,
  });
});

// Get single order by id--> /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new Errors('Order not found with this ID', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Order retrieved successfully',
    order,
  });
});

// Get orders of logged in user --> /api/v1/orders/me
exports.getMyOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    message: 'Orders retrieved successfully',
    orders,
  });
});

exports.cancelOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new Errors('Order not found', 404));
  }

  // Tính khoảng thời gian từ khi tạo đơn đến hiện tại
  const timeElapsed = (Date.now() - order.createdAt) / (1000 * 60); // Đổi ra phút

  // Cho phép hủy nếu thời gian chưa vượt quá 30 phút
  if (timeElapsed > 30) {
    return next(
      new Errors(
        'Order can only be cancelled within 30 minutes of creation',
        400
      )
    );
  }

  order.orderStatus = 'Cancelled';
  await order.save();

  res.status(200).json({
    success: true,
    message: 'Order cancelled successfully',
    order,
  });
});
