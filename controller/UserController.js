const { User } = require("../models");

class UserController {
    async getUsers(req, res) {
        try {
        const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async createUser(req, res) {
        const { lastName, firstName, email, password } = req.body;
        try {
            const newUser = await User.create({ lastName, firstName, email, password });
            res.status(201).json(newUser);
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            await user.destroy();
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new UserController();
