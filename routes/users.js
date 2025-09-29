const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');
const userController = require('../controller/userController');
const requireAuth = require('../middleware/requireAuth');
const authController = new AuthController();

// Middleware de protection via session



router.get('/login', (req, res) => {
   res.render('login');
});
router.get('/modifieMotpasse', (req, res) => {
    res.render('oublieMotpasse');
});

// Routes d'authentification
router.get('/register', (req, res) => {
    res.render('register');
});

// Routes d'authentification
router.post('/login', (req, res) => authController.login(req, res));
router.post('/register', (req, res) => authController.register(req, res));
router.post('/modifieMotpasse', (req, res) => authController.modifieMotpasse(req, res));
router.post('/modifieMotpasseByCode', (req, res) => authController.modifieMotpasseByCode(req, res));
router.post('/restPasword', (req, res) => authController.restPasword(req, res));
router.post('/logout', (req, res) => authController.logout(req, res));

// Routes utilisateurs protégées
router.get('/users', requireAuth, (req, res) => userController.getUsers(req, res));
router.get('/users/:id', requireAuth, (req, res) => userController.getUserById(req, res));
router.post('/users', requireAuth, (req, res) => userController.createUser(req, res));
router.delete('/users/:id', requireAuth, (req, res) => userController.deleteUser(req, res));

module.exports = router;