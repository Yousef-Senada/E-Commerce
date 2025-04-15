const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            maxlength: [50, "Category name must not exceed 50 characters"],
            lowercase: true,
            validate: {
                validator: async (value) => {
                    const existingCategory =
                        await mongoose.models.category.findOne({
                            name: value,
                            delete: false,
                        });
                    return !existingCategory;
                },
                message: "Category name must be unique",
            },
        },
        desc: {
            type: String,
            maxlength: [500, "Description must not exceed 500 characters"],
        },
        active: {
            type: Boolean,
            default: true,
        },
        delete: {
            type: Boolean,
            default: false,
        },
        displayInHome: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("category", categorySchema);
