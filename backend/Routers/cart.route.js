const cartController = require("../Controllers/cart.controller.js");
const express = require("express");
const router = express.Router();
const { authMW, adminMW } = require("../utils/auth");

router.post("/addProduct", authMW, cartController.addItemCart);
router.post("/decreaseProduct", authMW, cartController.decreaseItemCart);
router.post("/deleteProduct", authMW, cartController.deleteItemCart);
router.get("/", authMW, adminMW, cartController.getCarts);
router.get("/:id", authMW, cartController.getCart);
router.get("/user/:userId", authMW, cartController.getCartByUserId);

module.exports = router;
