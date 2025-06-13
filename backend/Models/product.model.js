const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            maxlength: [100, "Product name must not exceed 100 characters"],
            lowercase: true,
            validate: {
                validator: async (value) => {
                    const existingProduct =
                        await mongoose.models.product.findOne({
                            name: value,
                            delete: false,
                        });
                    return !existingProduct;
                },
                message: "Product name must be unique",
            },
        },
        desc: {
            type: String,
            maxlength: [500, "Description must not exceed 500 characters"],
        },
        imgURL: {
            type: String,
            required: [true, "Image is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price must be at least 0"],
        },
        stock: {
            type: Number,
            required: [true, "Stock is required"],
            min: [0, "Stock cannot be negative"],
        },
        isStock: {
            type: Boolean,
            default: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        delete: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            min: [0, "Rating must be at least 0"],
            max: [5, "Rating must not exceed 5"],
            default: 0,
        },
        review: {
            type: Number,
            default: 0,
        },
        carousel: {
            type: Boolean,
            default: false,
        },
        categories: [
            {
                category: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "category",
                    required: [true, "Category ID is required"],
                },
            },
        ],
    },
    { timestamps: true }
);

productSchema.pre("save", function (next) {
    if (this.stock === 0) {
        this.isStock = false;
    } else {
        this.isStock = true;
    }
    next();
});

module.exports = mongoose.model("product", productSchema);
