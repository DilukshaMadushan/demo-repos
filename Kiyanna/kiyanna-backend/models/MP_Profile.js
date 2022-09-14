const mongoose = require('mongoose');
const slugify = require('slugify');
const fs = require('fs-extra');

const MP_ProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a Name'],
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },

    slug: String,

    description: {
      type: String,
      // required: [true, 'Please add a Description'],
      default: 'This is my Description',
    },

    rateBy: [{ type: String }],
    followBy: [{ type: String }],

    isFollow: {
      type: Boolean,
      default: false,
    },

    isRate: {
      type: Boolean,
      default: false,
    },

    rateCount: {
      type: Number,
      default: 0,
    },

    followCount: {
      type: Number,
      default: 0,
    },

    profilePic: {
      type: String,
      default: 'no-photo.jpg',
    },

    link: { type: String },

    averageRating: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be at least 1'],
      max: [10, 'Rating must can not be more than 10'],
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

MP_ProfileSchema.index({ name: 'text' });

MP_ProfileSchema.statics = {
  searchPartial: function (q, callback) {
    return this.find(
      {
        $or: [{ name: new RegExp(q, 'gi') }],
      },
      callback
    )
      .limit(10)
      .sort('-averageRating')
      .select('-rateBy')
      .select('-followBy');
  },

  searchFull: function (q, callback) {
    return this.find(
      {
        $text: { $search: q, $caseSensitive: false },
      },
      callback
    )
      .select('-rateBy')
      .select('-followBy');
  },

  search: function (q, callback) {
    this.searchFull(q, (err, data) => {
      if (err) return callback(err, data);
      if (!err && data.length) return callback(err, data);
      if (!err && data.length === 0) return this.searchPartial(q, callback);
    });
  },
};

// // Cascade delete petProfiles when a User Profile is deleted
// MP_ProfileSchema.pre('remove', async function (next) {
//   await this.model('Pet').deleteMany({ profile: this._id });
//   next();
// });

// // Cascade delete Resources when a User Profile is deleted
// MP_ProfileSchema.pre('remove', async function (next) {
//   await this.model('Resource').deleteMany({ profileId: this._id });
//   next();
// });

//Create profile slug from the name
MP_ProfileSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//Reverse populate with virtuals
MP_ProfileSchema.virtual('ideas', {
  ref: 'Idea',
  localField: '_id',
  foreignField: 'mp_profile',
  justOne: false,
});

module.exports = mongoose.model('MP_Profile', MP_ProfileSchema);
