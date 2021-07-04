const express = require('express');
const route = express.Router();

const auth = require('../controllers/auth');

route.post('/register', auth.register);
route.post('/login', auth.login);


module.exports = route;