const express = require("express");
const router = express.Router();
const productController = require("../Controllers/product.controller");
const multer = require("multer");
const { storage } = require("../config/cloudinary.config");
const { authMW } = require("../utils/auth");
const upload = multer({ storage });


router.get("/", productController.getProducts);
router.get("/active", productController.getActiveProducts);
router.get("/:id", productController.getOneProduct);
router.post(
    "/add",
    upload.single("imgURL"),
    authMW,
    productController.createProduct
);
router.delete("/:id", authMW, productController.deleteOneProduct);
router.put("/:id", authMW, productController.updateOneProduct);

module.exports = router;
