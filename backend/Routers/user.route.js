const express = require("express");
const router = express.Router();
const userController = require("../Controllers/user.controller");
const { authMW } = require("../utils/auth");

router.get("/", authMW, userController.getUsers);
router.get("/:id", authMW, userController.getOneUser);
router.delete("/:id", authMW, userController.deleteOneUser);
router.post("/update/:id", authMW, userController.updateUser);
router.post("/register", userController.createUser);
router.post("/login", userController.login);

module.exports = router;
