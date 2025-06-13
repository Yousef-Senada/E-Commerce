const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect(process.env.DB_URL)
    console.log('DataBase Connected')
}

module.exports = connectDB
