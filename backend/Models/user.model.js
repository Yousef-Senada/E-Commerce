const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name is required"],
            trim: true,
            lowercase: true,
            minlength: [3, "First Name must be greater than 3 characters"],
            maxlength: [10, "First Name must be less than 30 characters"],
        },
        lastName: {
            type: String,
            required: [true, "Last Name is required"],
            trim: true,
            lowercase: true,
            minlength: [3, "Last Name must be greater than 3 characters"],
            maxlength: [10, "Last Name must be less than 30 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Email is invalid",
            ],
            validate: {
                validator: async function (value) {
                    const existingUser = await mongoose.models.user.findOne({
                        email: value,
                        delete: false,
                    });
                    return !existingUser;
                },
                message: "Email must be unique",
            },
        },
        phone: {
            type: String,
            required: [true, "Phone is required"],
            match: [/^(?:\+?20|0)?1[0125]\d{8}$/, "Phone is invalid"],
        },
        birthdate: {
            type: Date,
            required: [true, "Birthdate is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            validate: {
                validator: function (v) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(
                        v
                    );
                },
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.",
            },
        },
        city: {
            type: String,
            required: [true, "City is required"],
            minlength: [3, "City must be greater than 3 characters"],
            maxlength: [20, "City must be less than 20 characters"],
        },
        addresses: [
            {
                address: {
                    type: String,
                    maxlength: [50, "Address must be less than 50 characters"],
                },
            },
        ],
        userType: {
            type: String,
            lowercase: true,
            enum: ["user", "admin"],
            default: "user",
        },
        active: {
            type: Boolean,
            default: true,
        },
        delete: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
