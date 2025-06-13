const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "User is required"],
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product",
                    required: [true, "Product is required"],
                },
                quantity: {
                    type: Number,
                    required: [true, "Quantity is required"],
                    default: 1,
                    min: [1, "Quantity must be at least 1"],
                },
            },
        ],
        total: {
            type: Number,
            default: 0,
            min: [0, "Total must be at least 0"],
        },
    },
    { timestamps: true }
);

cartSchema.pre("save", async function (next) {
    const cart = this;
    let total = 0;
    for (const item of cart.products) {
        const product = await mongoose.model("product").findById(item.product);
        if (product) {
            total += product.price * item.quantity;
        }
    }
    cart.total = total;
    next();
});

module.exports = mongoose.model("cart", cartSchema);
