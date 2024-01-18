const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/products');
const Order = require('../models/order');

dotenv.config({path: './config/config.env'});

connectDatabase();

const seedProducts = async () =>
{
    try {

        await Order.deleteMany();
        console.log('All Orders has been deleted');
        await Product.deleteMany();
        console.log('All Products has been deleted');

        await Product.insertMany(products);
        console.log('All Products from product.json has been added');

        process.exit();

    }
    catch(error)
    {
        console.log(error.message);
        process.exit();
    }
}
seedProducts();