const { Categorie } = require('../models');


class CategorieController {
    async getAllCategories(req,res){
        try {
            const categories = await Categorie.findAll();
            res.status(200).json(categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    async createCategory(req,res){
        const { name, description } = req.body;
        try {
            const newCategory = await Categorie.create({ name, description });
            res.status(201).json(newCategory);
        } catch (error) {
            console.error("Error creating category:", error);
            res.status(500).json({ message: "Internal server error" });
        }
        };

        async updateCategory(req, res) {
            const { id } = req.params;
            const { name, description} = req.body;
        const category = await Categorie.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        try {
            category.name = name || category.name;
            category.description = description || category.description;
            await category.save();
            res.status(200).json(category);
        } catch (error) {
            console.error("Error updating category:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
    async deleteCategory(req, res) {
        const { id } = req.params;
        try {
            const category = await Categorie.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            await category.destroy();
            res.status(200).json({ message: "Category deleted successfully" });
        } catch (error) {
            console.error("Error deleting category:", error);
            res.status(500).json({ message: "Internal server error" });
        };

    };
}
module.exports = new CategorieController();