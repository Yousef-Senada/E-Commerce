const cartModel = require("../Models/cart.model.js");

exports.getCarts = async (req, res) => {
    try {
        const cart = await cartModel.find();
        res.status(200).json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const cart = await cartModel.findById(req.params.id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.getCartByUserId = async (req, res) => {
    try {
        const cart = await cartModel
            .findOne({ userId: req.params.userId })
            .populate("products.product");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteItemCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        if (!userId || !productId) {
            return res.status(400).json({
                error: "userId and productId are required",
            });
        }
        const cart = await cartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                error: "No Cart Found User or happen Error.",
            });
        }

        const product = cart.products.find(
            (item) => item.product.toString() === productId
        );
        if (!product) {
            return res.status(404).json({
                error: "No Product Found or happened Error.",
            });
        }
        cart.products = cart.products.filter(
            (item) => item.product.toString() !== productId
        );

        await cart.save();
        res.status(200).json({
            message: "Product removed from cart successfully.",
            cart,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addItemCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || !quantity) {
            return res.status(400).json({
                error: "userId, productId, and quantity are required",
            });
        }
        const cart = await cartModel.findOne({ userId });

        if (!cart) {
            return res
                .status(404)
                .json({ error: "No Cart Found User or happen Error" });
        }

        const product = cart.products.find(
            (item) => item.product.toString() === productId
        );

        if (product) {
            product.quantity += quantity;
        } else {
            cart.products = [
                ...cart.products,
                { product: productId, quantity },
            ];
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.decreaseItemCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || !quantity) {
            return res.status(400).json({
                error: "userId, productId, and quantity are required",
            });
        }

        const cart = await cartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                error: "No Cart Found User or happened Error.",
            });
        }

        const product = cart.products.find(
            (item) => item.product.toString() === productId
        );

        if (!product) {
            return res.status(404).json({
                error: "No Product Found or happened Error.",
            });
        }

        if (product.quantity <= 0) {
            return res.status(404).json({
                error: "The Product is 0",
            });
        }
        if (product.quantity <= quantity) {
            cart.products = cart.products.filter(
                (item) => item.product.toString() !== productId
            );
        } else {
            product.quantity -= quantity;
        }

        await cart.save();
        res.status(200).json({
            message: "Product quantity decreased successfully.",
            cart,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
