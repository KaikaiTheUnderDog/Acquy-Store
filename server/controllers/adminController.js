const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');

const Errors = require('../utils/errors');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

const cloudinary = require('cloudinary').v2;

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

    const dailySalesData = await Order.aggregate([
      {
        $match: {
          orderStatus: 'Delivered',
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: '$createdAt' },
          totalSales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } }, // Sắp xếp theo ngày trong tháng
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

    const pendingOrdersCount =
      ordersByStatus.find((status) => status._id === 'Pending')?.count || 0;
    const shippingOrdersCount =
      ordersByStatus.find((status) => status._id === 'Shipping')?.count || 0;
    const cancelledOrdersCount =
      ordersByStatus.find((status) => status._id === 'Cancelled')?.count || 0;
    const deliveredOrdersCount =
      ordersByStatus.find((status) => status._id === 'Delivered')?.count || 0;

    const pendingPercentage = (
      (pendingOrdersCount / totalOrders) *
      100
    ).toFixed(2);
    const shippingPercentage = (
      (shippingOrdersCount / totalOrders) *
      100
    ).toFixed(2);
    const cancelledPercentage = (
      (cancelledOrdersCount / totalOrders) *
      100
    ).toFixed(2);
    const deliveredPercentage = (
      (deliveredOrdersCount / totalOrders) *
      100
    ).toFixed(2);

    const deliveredOrdersByCountry = await Order.aggregate([
      {
        $match: {
          orderStatus: 'Delivered',
        },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$shippingInfo.country', 'Vietnam'] },
              'Vietnam',
              {
                $cond: [
                  { $eq: ['$shippingInfo.country', 'United States'] },
                  'United States',
                  'Others',
                ],
              },
            ],
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const vietnamOrdersCount =
      deliveredOrdersByCountry.find((country) => country._id === 'Vietnam')
        ?.count || 0;
    const usOrdersCount =
      deliveredOrdersByCountry.find(
        (country) => country._id === 'United States'
      )?.count || 0;
    const otherOrdersCount =
      deliveredOrdersByCountry.find((country) => country._id === 'Others')
        ?.count || 0;

    res.status(200).json({
      success: true,
      data: {
        userCount,
        productCount,
        orders: {
          total: totalOrders,
          byStatus: ordersByStatus,
          ordersToday,
          percentages: {
            pending: pendingPercentage,
            shipping: shippingPercentage,
            cancelled: cancelledPercentage,
            delivered: deliveredPercentage,
          },
        },
        sales: salesData.length > 0 ? salesData[0] : { totalSales: 0 },
        weeklySalesData,
        monthlySalesData,
        dailySalesData,
        deliveredOrdersByCountry: {
          vietnam: vietnamOrdersCount,
          unitedStates: usOrdersCount,
          others: otherOrdersCount,
        },
      },
    });
  } catch (error) {
    return next(new Errors(error.message, 500));
  }
});

const getUserData = async (startDate, endDate, timeUnit) => {
  const data = await User.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: {
          time: { [`$${timeUnit}`]: '$createdAt' },
          isVerified: '$isVerified',
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.time': 1 } }, // Sort by time
  ]);

  const verifiedData = data.filter((d) => d._id.isVerified);
  const unverifiedData = data.filter((d) => !d._id.isVerified);

  return { verifiedData, unverifiedData };
};

// Get new users count (Admin) => /api/v1/admin/users/count
exports.getNewUserData = catchAsyncErrors(async (req, res, next) => {
  // Fetch data for daily, weekly, and monthly
  const dailyData = await getUserData(startOfMonth, endOfMonth, 'dayOfMonth');
  const weeklyData = await getUserData(startOfWeek, endOfWeek, 'dayOfWeek');
  const monthlyData = await getUserData(
    new Date(`${new Date().getFullYear()}-01-01`),
    new Date(`${new Date().getFullYear()}-12-31`),
    'month'
  );

  res.status(200).json({
    success: true,
    data: {
      dailyNewUserData: {
        verified: dailyData.verifiedData,
        unverified: dailyData.unverifiedData,
      },
      weeklyNewUserData: {
        verified: weeklyData.verifiedData,
        unverified: weeklyData.unverifiedData,
      },
      monthlyNewUserData: {
        verified: monthlyData.verifiedData,
        unverified: monthlyData.unverifiedData,
      },
    },
  });
});

// Create a new product --> /api/v1/admin/products/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: 'products',
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  console.log(req.body.images);

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Update product --> /api/v1/admin/product/:id
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errors('Product not found', 404));
  }

  const { name, price, description, category, stock } = req.body;
  let newImages = [];

  if (req.body.images) {
    try {
      const images = req.body.images;

      // Loop through the images and check if they are new or existing
      for (let i = 0; i < images.length; i++) {
        if (images[i].public_id === 'new') {
          // Upload new image to Cloudinary
          const result = await cloudinary.uploader.upload(images[i].url, {
            folder: 'products',
          });

          newImages.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        } else {
          // Retain existing image
          newImages.push(images[i]);
        }
      }
    } catch (error) {
      return next(new Errors('Invalid image data', 400));
    }
  }

  product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      price,
      description,
      category,
      stock,
      images: newImages.length > 0 ? newImages : product.images,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    product,
  });
};

// Delete Product -> /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  // Deleting images associated with the product
  for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Product is deleted.',
  });
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

const startOfYesterday = new Date(startOfToday);
startOfYesterday.setDate(startOfToday.getDate() - 1);

const endOfYesterday = new Date(endOfToday);
endOfYesterday.setDate(endOfToday.getDate() - 1);

const startOfLastWeek = new Date();
startOfLastWeek.setDate(
  startOfLastWeek.getDate() - startOfLastWeek.getDay() - 6
);
startOfLastWeek.setHours(0, 0, 0, 0);

const endOfLastWeek = new Date(startOfLastWeek);
endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
endOfLastWeek.setHours(23, 59, 59, 999);

const startOfLastMonth = new Date();
startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
startOfLastMonth.setDate(1);
startOfLastMonth.setHours(0, 0, 0, 0);

const endOfLastMonth = new Date(startOfLastMonth);
endOfLastMonth.setMonth(startOfLastMonth.getMonth() + 1);
endOfLastMonth.setDate(0);
endOfLastMonth.setHours(23, 59, 59, 999);

const getSalesCount = async (startDate, endDate) => {
  const sales = await Order.aggregate([
    {
      $match: {
        orderStatus: 'Delivered',
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $unwind: '$orderItems',
    },
    {
      $group: {
        _id: '$orderItems.product',
        totalSold: { $sum: '$orderItems.quantity' },
      },
    },
  ]);
  return sales;
};

const calculateGrowth = (currentSales, previousSales) => {
  const growthMap = new Map();
  previousSales.forEach((sale) => {
    growthMap.set(sale._id.toString(), sale.totalSold);
  });

  return currentSales.map((sale) => {
    const previousTotal = growthMap.get(sale._id.toString()) || 0;
    const gain =
      previousTotal === 0
        ? 0
        : ((sale.totalSold - previousTotal) / previousTotal) * 100;
    return {
      productId: sale._id,
      gain,
    };
  });
};

// Get all products (Admin)  =>   /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;

  const salesThisMonth = await getSalesCount(startOfMonth, endOfToday);
  const salesLastMonth = await getSalesCount(startOfLastMonth, endOfLastMonth);

  const monthlyGrowth = calculateGrowth(salesThisMonth, salesLastMonth);

  let productsWithGrowth = products.map((product) => {
    const monthlyGain =
      monthlyGrowth.find(
        (growth) => growth.productId.toString() === product._id.toString()
      )?.gain || 0;

    return {
      ...product._doc,
      monthlyGain,
    };
  });

  const mostGainedProducts = productsWithGrowth
    .sort((a, b) => b.monthlyGain - a.monthlyGain)
    .slice(0, 5);

  res.status(200).json({
    success: true,
    count: productsWithGrowth.length,
    products: productsWithGrowth,
    mostGained: mostGainedProducts,
  });
});
