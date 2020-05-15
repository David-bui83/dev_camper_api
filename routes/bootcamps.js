const express = require('express');
const {
  getBootcamps, 
  getBootcamp, 
  createBootcamp, 
  updateBootcamp, 
  deleteBootcamp,
  getBootcampsInRadius
} = require('../controllers/bootcamps');
const router = express.Router();

// Routes with zipcode, distance params
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

// Routes without params
router.route('/')
.get(getBootcamps)
.post(createBootcamp);

// Routes with id params
router.route('/:id')
.get(getBootcamp)
.put(updateBootcamp)
.delete(deleteBootcamp)

module.exports = router;