const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');

const Errors = require('../utils/errors');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jsonWebToken');

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
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    user: req.user._id,
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

// Get all orders --> /api/v1/admin/order
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  // Show on dashboard
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    message: 'Orders retrieved successfully',
    totalAmount,
    orders,
  });
});

// Update pending orders --> /api/v1/admin/order/:id
exports.updatePendingOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === 'Delivered') {
    return next(new Errors('This order has already been delivered', 400));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
    message: 'Order updated successfully',
    order,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete order --> /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new Errors('Order not found with this ID', 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Order deleted successfully',
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
