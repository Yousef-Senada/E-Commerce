const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: "dkxb9zmip",
    api_key: "239513148398243",
    api_secret: "TNXnwwtfwDVe6dFqYIG9KAGW0Rc",
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "productImages",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

module.exports = { cloudinary, storage };
