const productModel = require("../Models/product.model");
const mongoose = require("mongoose");

exports.createProduct = async (req, res) => {
    try {
        const { categories } = req.body;

        if (!categories || categories.length === 0) {
            return res
                .status(400)
                .json({ error: "Product must contain at least one Category" });
        }

        for (let category of categories) {
            if (!mongoose.Types.ObjectId.isValid(category.category)) {
                return res.status(400).json({
                    error: `Invalid Category ID: ${category.category}`,
                });
            }
        }

        req.body.imgURL = req.file.filename;
        const product = await productModel.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const product = await productModel
            .find({ delete: false })
            .populate("categories.category", "name");
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getActiveProducts = async (req, res) => {
    try {
        const product = await productModel
            .find({ active: true, delete: false })
            .populate("categories.category", "name");
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOneProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel
            .findById(productId)
            .populate("categories.category", "name");
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateOneProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findByIdAndUpdate(
            productId,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (product) {
            res.status(201).json(product);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteOneProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findByIdAndUpdate(
            productId,
            {
                delete: true,
                active: false,
            },
            { new: true, runValidators: true }
        );
        if (product) {
            res.status(201).json(product);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
