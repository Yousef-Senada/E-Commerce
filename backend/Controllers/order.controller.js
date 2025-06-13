const orderModel = require("../Models/order.model");
const Product = require("../Models/product.model");

exports.createOrder = async (req, res) => {
    try {
        const { orderItems, discount } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res
                .status(400)
                .json({ error: "Order must contain at least one item." });
        }

        const populatedItems = [];
        for (const item of orderItems) {
            const product = await Product.findById(item.product_id);
            
            if (!product) {
                return res.status(404).json({
                    error: `Product with ID ${item.product_id} not found.`,
                });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    error: `Not enough stock for product ${product.name}. Available stock: ${product.stock}.`,
                });
            }
            populatedItems.push({
                product_id: item.product_id,
                quantity: item.quantity,
                price: product.price,
            });
            product.stock -= item.quantity;
            await product.save();
        }
        let totalPrice = populatedItems.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
        );
        if (discount) {
            totalPrice = totalPrice * ((100 - discount) / 100);
        }
        const order = await orderModel.create({
            ...req.body,
            orderItems: populatedItems,
            total: totalPrice,
            status_history: [{ status: "pending", date: new Date() }],
            status: "pending",
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const order = await orderModel.find();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const orders = await orderModel.find({ user_id: userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getOneOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await orderModel.findById(orderId);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ error: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateStatusOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const status = req.body.status;
        const validStatuses = [
            "pending",
            "confirmed",
            "shipped",
            "delivered",
            "cancelled",
            "returned",
        ];

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                error: `Invalid status: '${status}'. Allowed statuses are: ${validStatuses.join(
                    ", "
                )}.`,
            });
        }

        if (status === "returned") {
            for (const item of order.orderItems) {
                const product = await Product.findById(item.product_id);
                product.stock += item.quantity;
                await product.save();
            }
        }

        order.status_history.push({
            status: status,
            date: new Date(),
        });
        order.status = status;
        await order.save();

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.returnOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        if (order.status !== "delivered") {
            return res.status(400).json({
                error: `Order status is '${order.status}'. Only delivered orders can be returned.`,
            });
        }

        for (const item of order.orderItems) {
            const product = await Product.findById(item.product_id);
            product.stock += item.quantity;
            await product.save();
        }

        order.status_history.push({
            status: "returned",
            date: new Date(),
        });
        order.status = "returned";
        await order.save();

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        if (order.status !== "pending") {
            return res.status(400).json({
                error: `Order status is '${order.status}'. Only pending orders can be cancelled.`,
            });
        }

        for (const item of order.orderItems) {
            const product = await Product.findById(item.product_id);
            product.stock += item.quantity;
            await product.save();
        }

        order.status_history.push({
            status: "cancelled",
            date: new Date(),
        });
        order.status = "cancelled";
        await order.save();

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
