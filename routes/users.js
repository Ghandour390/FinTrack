const AuthController = require('../controller/AuthController');
// const userController = require('../controller/UserController');
const dashboardController = require('../controller/DashboardController');
const requireAuth = require('../middleware/requireAuth');
const route = require('express').Router();

const authcontroller = new AuthController();
// const usercontroller = new userController();

route.get('/register', (req, res) => {
  res.render('register');
});
route.get('/login', (req, res) => {
    console.log("login");
  res.render('login',{"message":""});
});
route.post('/register', authcontroller.register);
route.post('/login', authcontroller.login);
// route.get('/user', usercontroller.getUser);
route.get('/logout', authcontroller.logout);

route.get('/dashboard', dashboardController.getDashboard.bind(dashboardController));





module.exports =route;



