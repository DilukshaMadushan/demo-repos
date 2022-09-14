const express = require('express');
const {
  getRatings,
  getRating,
  addRating,
  deleteRating,
} = require('../controllers/mp_ratings');

const Rating = require('../models/MP_Rating');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

// Protect Middleware
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, advancedResults(Rating), getRatings)
  .post(protect, authorize('user', 'admin'), addRating);

router.route('/:id').get(getRating).delete(protect, deleteRating);

module.exports = router;
