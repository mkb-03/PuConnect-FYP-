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


backgroundBannerSchema.statics.findOrCreateDefault = async function (userId) {
  try {
      const defaultBanner = await this.findOne({ userId, isDefault: true });

      if (defaultBanner) {
          return defaultBanner;
      }

      // If no default banner found, check for the latest non-default banner
      const latestBanner = await this.findOne({ userId, isDefault: false }).sort({ createdAt: -1 });

      if (latestBanner) {
          return latestBanner;
      }

      // If no default or non-default banner found, create a new default banner
      const newDefaultBanner = new this({
          userId,
          bg_image: '/backend/image/defaultBanner.jpg', // Change this path if needed
          isDefault: true,
      });

      await newDefaultBanner.save();

      return newDefaultBanner;
  } catch (error) {
      console.error(error);
      throw new Error('Error finding or creating default banner');
  }
};


const BackgroundBanner = mongoose.model('BackgroundBanner', backgroundBannerSchema);

module.exports = BackgroundBanner;
