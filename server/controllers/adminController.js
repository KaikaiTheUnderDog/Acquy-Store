const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');

const Errors = require('../utils/errors');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const endOfToday = new Date();
endOfToday.setHours(23, 59, 59, 999);

const startOfWeek = new Date();
startOfWeek.setDate(
  startOfWeek.getDate() -
    startOfWeek.getDay() +
    (startOfWeek.getDay() === 0 ? -6 : 1)
); // Đặt là thứ Hai
startOfWeek.setHours(0, 0, 0, 0);

const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(startOfWeek.getDate() + 6); // Kết thúc vào Chủ Nhật
endOfWeek.setHours(23, 59, 59, 999);

const startOfMonth = new Date();
startOfMonth.setDate(1);
startOfMonth.setHours(0, 0, 0, 0);

const endOfMonth = new Date(
  startOfMonth.getFullYear(),
  startOfMonth.getMonth() + 1,
  0
);
endOfMonth.setHours(23, 59, 59, 999);

// Get dashboard data --> /api/v1/admin/dashboard
exports.getDashboardData = catchAsyncErrors(async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$orderStatus', count: { $sum: 1 } } },
    ]);

    const ordersToday = await Order.countDocuments({
      createdAt: { $gte: startOfToday, $lte: endOfToday },
      orderStatus: { $ne: 'Cancelled' },
    });

    const weeklySalesData = await Order.aggregate([
      {
        $match: {
          orderStatus: 'Delivered',
          createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: '$createdAt' },
          totalSales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } }, // Sắp xếp theo ngày trong tuần
    ]);

    const currentYear = new Date().getFullYear();
    const monthlySalesData = await Order.aggregate([
      {
        $match: {
          orderStatus: 'Delivered',
          createdAt: {
            $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
            $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          totalSales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } }, // Sắp xếp theo tháng
    ]);

    const salesData = await Order.aggregate([
      { $match: { orderStatus: 'Delivered' } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        userCount,
        productCount,
        orders: {
          total: totalOrders,
          byStatus: ordersByStatus,
          ordersToday,
        },
        sales: salesData.length > 0 ? salesData[0] : { totalSales: 0 },
        weeklySalesData,
        monthlySalesData,
      },
    });
  } catch (error) {
    return next(new Errors(error.message, 500));
  }
});

// Get all orders --> /api/v1/admin/orders
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

  order.orderStatus = req.body.status;

  if (req.body.status === 'Delivered') {
    order.deliveredAt = Date.now();

    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity);
    });
  } else order.deliveredAt = undefined;

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
  product.sold += quantity;
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
