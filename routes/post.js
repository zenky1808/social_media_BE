const express = require('express');
const route = express.Router();

const post = require('../controllers/post');

// Create a post
route.post('/', post.createPost);
// Get timeline a post
route.get('/timeline', post.getTimeline);
// Update a post
route.put('/:id', post.updatePost);
// Delete a post
route.delete('/:id', post.deletePost);
// Get a post
route.get('/:id', post.getPost);
// Like a post
route.put('/:id/like', post.likePost);
module.exports = route;