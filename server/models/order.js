const moongoose = require('mongoose');

const orderSchema = new moongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
  },
  user: {
    type: moongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Stripe', 'COD'],
  },
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  purchasedAt: {
    type: Date,
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ['Pending', 'Shipping', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = moongoose.model('Order', orderSchema);
