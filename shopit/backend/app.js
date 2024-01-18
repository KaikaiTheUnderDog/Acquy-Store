const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const errorMiddleware = require('./middlewares/error')

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));

// Increase the limit for URL-encoded payloads
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(fileUpload())


const products= require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment')
const flashsale = require('./routes/flashsale')

app.use('/api/v1', products);
app.use('/app/v1', flashsale)
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', payment);
app.use(errorMiddleware);

module.exports = app