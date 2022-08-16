const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.handleLogin);
router.post('/register', authController.handleNewUser);
router.get('/user', authController.getUser)
router.post('/user')

module.exports = router;