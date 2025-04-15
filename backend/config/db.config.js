const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://YousefSenada:WpRoFpYJQZlomYl9@e-com.7mhgm.mongodb.net/?retryWrites=true&w=majority&appName=e-com"
    );
    console.log("DataBase Connected");
};

module.exports = connectDB;
