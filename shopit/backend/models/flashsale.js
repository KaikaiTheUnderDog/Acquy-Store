const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flashSaleSchema = new Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },
    startTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    endTime: {
        type: Date,
        index: {
            expireAfterSeconds: 5,
            partialFilterExpression: { isActive: true }
        },
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    discountPercent: {
        type: Number,
        required: true
    }
});

flashSaleSchema.index({ endTime: 1 }, { expireAfterSeconds: 0, partialFilterExpression: { isActive: true } });

const FlashSale = mongoose.model('FlashSale', flashSaleSchema);
