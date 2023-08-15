const express = require('express');
const { createUser, createUserLogin } = require('./userController');
const router = express.Router();
router.post('/register', createUser);
router.post('/login', createUserLogin);
module.exports = router;
