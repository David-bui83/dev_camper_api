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

// Advance results middleware
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

// Routes with zipcode, distance params
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

// Route for file upload
router.route('/:id/photo').put(BootcampPhotoUpload);

// Routes without params
router.route('/')
.get(advancedResults(bootcamp, 'courses'), getBootcamps)
.post(createBootcamp);

// Routes with id params
router.route('/:id')
.get(getBootcamp)
.put(updateBootcamp)
.delete(deleteBootcamp)

module.exports = router;