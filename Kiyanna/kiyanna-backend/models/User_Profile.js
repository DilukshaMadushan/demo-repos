const mongoose = require('mongoose');
const slugify = require('slugify');
const fs = require('fs-extra');

const UserProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a Name'],
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },

    city: {
      type: String,
      default: 'My City',
      trim: true,
      maxlength: [50, 'City can not be more than 50 characters'],
    },

    anonymous: {
      type: Boolean,
      default: true,
    },

    slug: String,

    status: {
      type: String,
      default: 'This is my status',
      maxlength: [500, 'Status can not be more than 500 characters'],
    },

    profilePic_URL: {
      type: String,
      default: 'no-photo.jpg',
    },

    createAt: {
      type: Date,
      default: Date.now,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// // Cascade delete petProfiles when a User Profile is deleted
// UserProfileSchema.pre('remove', async function (next) {
//   await this.model('Pet').deleteMany({ profile: this._id });
//   next();
// });

// // Cascade delete Resources when a User Profile is deleted
// UserProfileSchema.pre('remove', async function (next) {
//   await this.model('Resource').deleteMany({ profileId: this._id });
//   next();
// });

//Create profile slug from the name
UserProfileSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// //Reverse populate with virtuals
// UserProfileSchema.virtual('pets', {
//   ref: 'Pet',
//   localField: '_id',
//   foreignField: 'profile',
//   justOne: false,
// });

// //Reverse populate with virtuals
// UserProfileSchema.virtual('resources', {
//   ref: 'Resource',
//   localField: '_id',
//   foreignField: 'profile',
//   justOne: false,
// });

module.exports = mongoose.model('UserProfile', UserProfileSchema);
