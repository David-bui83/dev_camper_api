const express = require('express');
const {
  getBootcamps, 
  getBootcamp, 
  createBootcamp, 
  updateBootcamp, 
  deleteBootcamp,
  getBootcampsInRadius,
  BootcampPhotoUpload
} = require('../controllers/bootcamps');

const bootcamp = require('../models/Bootcamp');

// Include other resource routers
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

const router = express.Router();

// Advance results middleware
const advancedResults = require('../middleware/advancedResults');

// Protect middleware
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

// Routes with zipcode, distance params
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

// Route for file upload
router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), BootcampPhotoUpload);

// Routes without params
router.route('/')
.get(advancedResults(bootcamp, 'courses'), getBootcamps)
.post(protect, authorize('publisher', 'admin'), createBootcamp);

// Routes with id params
router.route('/:id')
.get(getBootcamp)
.put(protect, authorize('publisher', 'admin'), updateBootcamp)
.delete(protect, authorize('publisher', 'admin'), deleteBootcamp)

module.exports = router;