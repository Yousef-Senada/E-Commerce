const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Yousef-Senada:Posp012070!@cluster0.ujwzb8c.mongodb.net/')
    console.log('DataBase Connected')
}

module.exports = connectDB
