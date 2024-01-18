const app = require('./app')
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary')

const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down server due to Uncaught Exception');
    server.close(() => {
        process.exit(1)
    })
})

dotenv.config({ path: 'config/config.env' })

connectDatabase();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})