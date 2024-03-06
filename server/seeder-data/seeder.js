const Product = require('../models/product');
const User = require('../models/user');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('./products');

// Setting dotenv file
dotenv.config({ path: '../server/config/config.env' });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('Products deleted successfully');

    await Product.insertMany(products);
    console.log('Products inserted successfully');

    await User.deleteMany();
    console.log('Users deleted successfully');

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

seedProducts();
