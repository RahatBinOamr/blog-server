const express = require('express');
const {
  createUser,
  createUserLogin,
  findAllUser,
} = require('./userController');
const router = express.Router();
router.post('/register', createUser);
router.post('/login', createUserLogin);
router.get('/', findAllUser);
module.exports = router;
