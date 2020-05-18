const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

// User model
const User = require('../model/User');

// Merging routers
const router = express.Router({mergeParams: true});

// Advanced results middleware
const advancedResults = require('../middleware/advancedResults');

// Protect middleware
const { protect, authorize } = require('../middleware/auth');

// Protect middleware - any route below will be protected
router.use(protect);
// Any route below will be checked for admin role
router.use(authorize('admin'));

router.route('/')
.get(advancedResults(User), getUsers)
.post(createUser)

router.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser)