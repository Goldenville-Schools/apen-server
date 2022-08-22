const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController')

router.post('/', authController.handleLogin);
router.post('/register', authController.handleNewUser);
router.get('/user', userController.getUser)
router.post('/user')

module.exports = router;