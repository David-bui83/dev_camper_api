const express = require('express');
const {
  getReviews,
  getReview,
  addReview, 
  updateReview,
  deleteReview
} = require('../controllers/reviews');

// Review model
const Review = require('../models/Review');

// Merge router
const router = express.Router({mergeParams: true});

// Advanced results middleware
const advancedResults = require('../middleware/advancedResults');

// Authorization middleware
const { protect, authorize } = require('../middleware/auth');

// Routes
router.route('/')
.get(advancedResults(Review, {path: 'bootcamp', select: 'name description'}), getReviews)
.post(protect, authorize('user', 'admin'), addReview);

router.route('/:id')
.get(getReview)
.put(protect, authorize('user', 'admin'), updateReview)
.delete(protect, authorize('user', 'admin'), deleteReview);

module.exports = router;