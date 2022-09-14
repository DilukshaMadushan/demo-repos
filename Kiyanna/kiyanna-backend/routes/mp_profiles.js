const express = require('express');
const {
  getProfiles,
  createProfile,
  getProfile,
  getSignInProfile,
  updateProfile,
  deleteProfile,
  getLoggedInProfiles,
  search,
  searchOptimize,
  signInsearch,
  updateFollow,
  updateUnFollow,
} = require('../controllers/mp_profiles');

const Profile = require('../models/MP_Profile');

//Include other resource routers
const ideaRoute = require('./ideas');
const ratingRouter = require('./mp_ratings');

const router = express.Router();

// Protect middleware
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:profileId/ideas', ideaRoute);
router.use('/:profileId/ratings-mp', ratingRouter);

router
  .route('/')
  .get(getProfiles)
  .post(protect, authorize('admin'), createProfile);

router.route('/user/all').get(protect, getLoggedInProfiles);

router.route('/search').get(search);
router.route('/mp/search').get(searchOptimize);
router.route('/user/search').get(protect, signInsearch);

router.route('/:id/follow').put(protect, updateFollow);
router.route('/:id/unfollow').put(protect, updateUnFollow);

router.route('/:id/user/profile').get(protect, getSignInProfile);

router
  .route('/:id')
  .get(getProfile)
  .delete(protect, authorize('publisher', 'admin'), deleteProfile)
  .put(protect, authorize('admin'), updateProfile);

module.exports = router;
