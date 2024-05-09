const app = require('./app');
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');
// Set up file config
dotenv.config({ path: 'config/config.env' });

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Connect to DB
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle Uncalled exceptions
process.on('uncaughtException', (error) => {
  console.log(`ERROR: ${error.stack}`);
  console.log(`SHUTTING DOWN THE SERVER DUE TO UNCAUGHT EXCEPTION`);
  process.exit(1);
});

// Hanlde Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log(`SHUTTING DOWN THE SERVER DUE TO UNHANDLED PROMISE REJECTION`);
  server.close(() => process.exit(1));
});
