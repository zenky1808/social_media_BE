const express = require('express');
const route = express.Router();

const user = require('../controllers/user');

// Get all user
route.get('/', user.getUser);
// Update user
route.put('/:id', user.updateUser)
// Find user by id
route.get('/:id', user.getUserById)
// Delete user
route.delete('/:id', user.deleteUser)
// follow a user
route.put('/:id/follow', user.followUser)
// unfollow a user 
route.put('/:id/unfollow', user.unFollowUser)
module.exports = route;