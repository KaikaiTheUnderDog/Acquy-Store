const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');

const errorHandler = require('./middlewares/errorHandler');

// Set up file config
dotenv.config({ path: 'backend/config/config.env' });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Import all the routes
const auth = require('./routers/authRouter');
const product = require('./routers/productRouter');
const profile = require('./routers/profileRouter');

app.use('/api/v1', auth);
app.use('/api/v1', product);
app.use('/api/v1', profile);

// Middleware to handle errors
app.use(errorHandler);

module.exports = app;
