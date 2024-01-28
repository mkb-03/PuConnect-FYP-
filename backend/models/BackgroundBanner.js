const mongoose = require('mongoose');

const backgroundBannerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bg_image: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

// Static method to find or create a default background banner for a user
backgroundBannerSchema.statics.findOrCreateDefault = async function (userId) {
  const defaultBanner = await this.findOne({ userId, isDefault: true });

  if (defaultBanner) {
    return defaultBanner;
  }

  const newDefaultBanner = new this({
    userId,
    bg_image: '/backend/image/defaultBanner.jpg',
    isDefault: true,
  });

  await newDefaultBanner.save();

  return newDefaultBanner;
};

const BackgroundBanner = mongoose.model('BackgroundBanner', backgroundBannerSchema);

module.exports = BackgroundBanner;
