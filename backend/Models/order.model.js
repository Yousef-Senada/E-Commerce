const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "User ID is required"],
        },
        orderItems: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product",
                    required: [true, "Product ID is required"],
                },
                quantity: {
                    type: Number,
                    min: [1, "Quantity must be at least 1"],
                    default: 1,
                },
                price: {
                    type: Number,
                    min: [0, "Price must be a non-negative value"],
                },
            },
        ],
        discount: {
            type: Number,
            default: 0,
            min: [0, "Discount cannot be negative"],
            max: [100, "Discount cannot exceed 100%"],
        },
        total: {
            type: Number,
            min: [0, "Total price must be at least 0"],
        },
        status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "shipped",
                "delivered",
                "cancelled",
                "returned",
            ],
            default: "pending",
        },
        status_history: [
            {
                status: {
                    type: String,
                    enum: [
                        "pending",
                        "confirmed",
                        "shipped",
                        "delivered",
                        "cancelled",
                        "returned",
                    ],
                    required: true,
                },
                date: {
                    type: Date,
                    default: new Date(),
                },
            },
        ],
        delete: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

orderSchema.pre("save", function (next) {
    if (this.isModified("status")) {
        if (
            this.status_history.some((entry) => entry.status === "returned") &&
            this.status !== "returned"
        ) {
            return next(new Error("Cannot change status of a returned order."));
        }
        if (
            this.status_history.some((entry) => entry.status === "cancelled") &&
            this.status !== "cancelled"
        ) {
            return next(
                new Error("Cannot change status of a cancelled order.")
            );
        }
    }
    next();
});

module.exports = mongoose.model("order", orderSchema);
