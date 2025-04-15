const categoryModel = require("../Models/category.model");

exports.createCategory = async (req, res) => {
    try {
        const category = await categoryModel.create(req.body);
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const category = await categoryModel.find({ delete: false });
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.getOneCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryModel.findById(categoryId);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: "Category not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOneCategorByName = async (req, res) => {
    try {
        const categoryName = req.params.name;
        const category = await categoryModel.find({
            name: categoryName,
            delete: false,
        });
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: "Category not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getActiveCategories = async (req, res) => {
    try {
        const category = await categoryModel.find({
            active: true,
            delete: false,
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.updateOneCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryModel.findByIdAndUpdate(
            categoryId,
            req.body,
            { new: true, runValidators: true }
        );
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: "Category not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteOneCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryModel.findByIdAndUpdate(
            categoryId,
            { active: false, delete: true },
            { new: true, runValidators: true }
        );
        if (category) {
            s;
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: "Category not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
