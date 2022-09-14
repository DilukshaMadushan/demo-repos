const mongoose = require('mongoose');

const MPRatingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add a rating between 1 and 10'],
  },

  mp_profile: {
    type: mongoose.Schema.ObjectId,
    ref: 'MP_Profile',
    required: true,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent user from submitting more than one review per bootcamp
MPRatingSchema.index({ mp_profile: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
MPRatingSchema.statics.getAverageRating = async function (profileId) {
  const obj = await this.aggregate([
    {
      $match: { mp_profile: profileId },
    },
    {
      $group: {
        _id: '$mp_profile',
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  try {
    await this.model('MP_Profile').findByIdAndUpdate(profileId, {
      averageRating: obj[0].averageRating,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
MPRatingSchema.post('save', function () {
  this.constructor.getAverageRating(this.mp_profile);
});

// Call getAverageRating before remove
MPRatingSchema.pre('remove', function () {
  this.constructor.getAverageRating(this.mp_profile);
});

module.exports = mongoose.model('MPRating', MPRatingSchema);
