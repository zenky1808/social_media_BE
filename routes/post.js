const express = require('express');
const route = express.Router();

const postController = require('../controllers/post.controller');

route.get('/', postController.getPost);

module.exports = route;