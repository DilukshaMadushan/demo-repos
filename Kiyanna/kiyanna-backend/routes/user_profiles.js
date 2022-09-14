const express = require('express');
const {
  getProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
} = require('../controllers/user_profiles');

const Profile = require('../models/User_Profile');

//Include other resource routers
// const petsRoute = require('./pets');

const router = express.Router();

// Protect middleware
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
// router.use('/:profileId/pets', petsRoute);

router
  .route('/')
  .get(protect, advancedResults(Profile), authorize('admin'), getProfiles);

router
  .route('/:id')
  .get(protect, getProfile)
  .delete(protect, authorize('user', 'admin'), deleteProfile)
  .put(protect, authorize('user', 'admin'), updateProfile);

module.exports = router;
