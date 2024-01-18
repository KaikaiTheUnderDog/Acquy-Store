const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useUnifiedTopology: true
    }).then(con => {
        console.log(`MongoDB Database conneted with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase