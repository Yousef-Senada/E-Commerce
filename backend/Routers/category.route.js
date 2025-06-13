const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/category.controller");
const { authMW, adminMW } = require("../utils/auth");

router.get("/", categoryController.getCategories);
router.get("/active", categoryController.getActiveCategories);
router.get("/:id", categoryController.getOneCategory);
router.get("/:name", categoryController.getOneCategorByName);
router.post("/add", authMW, adminMW, categoryController.createCategory);
router.put("/:id", authMW, adminMW, categoryController.updateOneCategory);
router.delete("/:id", authMW, adminMW, categoryController.deleteOneCategory);

module.exports = router;
