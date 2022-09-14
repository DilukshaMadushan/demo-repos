const express = require('express');
const {
  register,
  registerGoogle,
  registerFacebook,
  login,
  getMe,
  forgotPassword,
  updateDetails,
  updatePassword,
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/register/google', registerGoogle);
router.post('/register/facebook', registerFacebook);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;
