const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/users', authController.registrar);
router.post('/auth/login', authController.login);

module.exports = router;