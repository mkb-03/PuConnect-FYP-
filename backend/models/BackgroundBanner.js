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
});

const BackgroundBanner = mongoose.model('BackgroundBanner', backgroundBannerSchema);

module.exports = BackgroundBanner;
