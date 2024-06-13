const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Login Page
router.get('/login', (req, res) => res.render('users/login'));

// Register Page
router.get('/register', (req, res) => res.render('users/register', { errors: [] }));

// Register Handle
router.post('/register', userController.registerUser);

// Login Handle
router.post('/login', userController.loginUser);

// Logout Handle
router.get('/logout', userController.logoutUser);

module.exports = router;


