const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/order.controller");
const { authMW, adminMW } = require("../utils/auth");

router.get("/", authMW, adminMW, orderController.getOrders);
router.put("/status/:id", authMW, adminMW, orderController.updateStatusOrder);
router.get("/:id", authMW, adminMW, orderController.getOneOrder);
router.get("/user/:user_id", authMW, orderController.getUserOrders);
router.post("/add", authMW, orderController.createOrder);
router.put("/return/:id", authMW, orderController.returnOrder);
router.put("/cancel/:id", authMW, orderController.cancelOrder);

module.exports = router;
