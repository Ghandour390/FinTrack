const bcrypt = require('bcrypt');
const {User} = require('../models');

class AuthController {
    constructor() {
        // On peut ajouter des propriétés partagées ici
        this.saltRounds = 10;
    }

    async register(req, res) {
        const {lastName, firstName, email, password} = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, this.saltRounds);
            const newUser = await User.create({lastName, firstName, email, password: hashedPassword});
            res.status(201).json({message: 'User registered successfully', user: newUser});
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    }

    async login(req, res) {
        const {email, password} = req.body;
        try {
            const user = await User.findOne({where: {email}});
            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({message: 'Invalid credentials'});
            }
            res.status(200).json({message: 'Login successful', user});
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    }

    async modifieMotpasse(req, res) {
        const {email, oldPassword, newPassword} = req.body;
        try {
            const user = await User.findOne({where: {email}});
            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({message: 'Invalid current password'});
            }
            const hashedNewPassword = await bcrypt.hash(newPassword, this.saltRounds);
            user.password = hashedNewPassword;
            await user.save();
            res.status(200).json({message: 'Password updated successfully'});
        } catch (error) {
            console.error('Error updating password:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    }
}

module.exports = AuthController;
                            
    

