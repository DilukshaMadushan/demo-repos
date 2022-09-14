const express = require('express');
const {
  getIdeas,
  getLoggedInIdeas,
  getIdeasForAdmin,
  getIdea,
  addIdea,
  updateIdea,
  deleteIdea,
  updateLike,
  updateUnlike,
} = require('../controllers/ideas');

// Include other resource router
// const ratingRouter = require('./mp_ratings');

const Idea = require('../models/Idea');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

// Re-route into other resource router
// router.use('/:ideaId/ratings%mp', ratingRouter);

// Protect Middleware
const { protect, authorize } = require('../middleware/auth');

router.route('/').get(getIdeas).post(protect, addIdea);

router.route('/user/all').get(protect, getLoggedInIdeas);

router
  .route('/admin')
  .get(protect, authorize('admin'), advancedResults(Idea), getIdeasForAdmin);

router.route('/:id/approve').put(protect, authorize('admin'), updateIdea);

router.route('/:id/like').put(protect, updateLike);
router.route('/:id/unlike').put(protect, updateUnlike);

router
  .route('/:id')
  .get(protect, getIdea)
  .delete(protect, authorize('user', 'admin'), deleteIdea);

module.exports = router;
