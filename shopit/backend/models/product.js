const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,
            'Please enter product name'],
        trim: true,
        maxLength: [100, 'product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5, 'product price  cannot exceed 5 characters '],
        default: 0.0
    },
    shortDescription: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    LongDescription: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    rating: {
        type: Number,
        default: 0
    },
    images: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    info: {
        releaseDate: {
            type: String,
            required: false
        },
        dimension: {
            type: String,
            required: false
        },
        weight: {
            type: String,
            required: false
        },
        quanranty: {
            type: String,
            required: false
        },
        included: {
            type: String,
            required: false
        }
    },
    category: {
        type: String,
        required: [true, "please select this product's catergory"],
        enum: {
            values: [
                'Handheld',
                'Controller',
                'Game Card',
                'Accessories',
                'Headphones',
                'Storage Expansion',
                'Console'
            ],
            message: ['please select correct category for this product']
        },
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'product stock cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
                default: 0,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model('Product', productSchema);