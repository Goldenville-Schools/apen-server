const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.getUser)
router.post('/reset-password', userController.changePassword)

module.exports = router;