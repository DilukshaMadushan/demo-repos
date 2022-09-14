const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema(
  {
    idea: {
      type: String,
    },

    isApproved: {
      type: Boolean,
      default: true,
    },

    likes: {
      type: Number,
      default: 0,
    },

    likedBy: [{ type: String }],

    isLiked: {
      type: Boolean,
      default: 'false',
    },

    isMpFollowed: {
      type: Boolean,
      default: 'false',
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    mp_profile: {
      type: mongoose.Schema.ObjectId,
      ref: 'MP_Profile',
      required: true,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'UserProfile',
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('Idea', IdeaSchema);
