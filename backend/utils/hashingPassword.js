const bcrypt = require("bcrypt");

exports.createHashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

exports.compareHashPassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
};
