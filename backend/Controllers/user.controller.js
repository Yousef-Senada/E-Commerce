const userModel = require("../Models/user.model");
const hashingPassword = require("../utils/hashingPassword");
const auth = require("../utils/auth.js");
const cartModel = require("../Models/cart.model.js");
exports.createUser = async (req, res) => {
    try {
        const { addresses } = req.body;
        if (!addresses || addresses.length === 0) {
            return res.status(400).json({
                error: "addresses must contain at least one address.",
            });
        }
        const passwordHash = await hashingPassword.createHashPassword(
            req.body.password
        );
        const user = await userModel.create({
            ...req.body,
            password: passwordHash,
        });

        const cart = await cartModel.create({
            userId: user._id,
        });

        const token = auth.createToken({
            userId: user._id,
            name: user.name,
            userType: user.userType,
        });

        res.status(200).json({ accessToken: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const user = await userModel.find({ delete: false });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOneUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json("User not found");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            addresses: req.body.addresses,
            birthdate: req.body.birthdate,
            city: req.body.city,
        };
        const user = await userModel.findByIdAndUpdate(userId, updates, {
            new: true,
            runValidators: true,
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json("User not found");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteOneUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findByIdAndUpdate(
            userId,
            {
                delete: true,
                active: false,
            },
            { new: true, runValidators }
        );
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json("User not found");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const findUser = await userModel.findOne({
            email: req.body.email,
            delete: false,
            active: true,
        });
        if (findUser) {
            if (findUser.active) {
                const isMatch = await hashingPassword.compareHashPassword(
                    req.body.password,
                    findUser.password
                );
                if (isMatch) {
                    const token = auth.createToken({
                        userId: findUser._id,
                        name: findUser.name,
                        userType: findUser.userType,
                    });

                    res.status(200).json({ accessToken: token });
                } else {
                    res.status(404).json({
                        error: "Email or Password is Wrong",
                    });
                }
            } else {
                res.status(404).json({ error: "Email or Password is Wrong" });
            }
        } else {
            res.status(404).json({ error: "Email or Password is Wrong" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
