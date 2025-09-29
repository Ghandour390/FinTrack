const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');
const authController = new AuthController();
const userController = require('../controller/userController');

router.get('/login', (req, res) => {
   res.render('login');
});

// Routes d'authentification
router.get('/register', (req, res) => {
    res.render('register');
});

// Routes d'authentification
router.post('/login', (req, res) => authController.login(req, res));
router.post('/register', (req, res) => authController.register(req, res));
router.post('/modifieMotpasse', (req, res) => authController.modifieMotpasse(req, res));

// Routes utilisateurs
router.get('/users', (req, res) => userController.getUsers(req, res));
router.get('/users/:id', (req, res) => userController.getUserById(req, res));
router.post('/users', (req, res) => userController.createUser(req, res));
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

module.exports = router;