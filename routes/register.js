const express = require('express');
const router = express.Router();

const verifyJWT = require('../middleware/verifyJWT')
const registerController = require('../controllers/registerController');

router.get('/', verifyJWT, registerController.handleRegisteration);
router.post('/', verifyJWT, registerController.handleRegister);

router.post('/test', verifyJWT, registerController.handleTestRegister);

module.exports = router;