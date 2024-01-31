const mongoose = require('mongoose');

const profilePictureSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

profilePictureSchema.statics.findOrCreateDefault = async function (userId) {
  try {
      const defaultProfile = await this.findOne({ userId, isDefault: true });

      if (defaultProfile) {
          return defaultProfile;
      }

      // If no default profile picture found, check for the latest non-default picture
      const latestProfilePicture = await this.findOne({ userId, isDefault: false }).sort({ createdAt: -1 });

      if (latestProfilePicture) {
          return latestProfilePicture;
      }

      // If no default or non-default profile picture found, create a new default profile picture
      const newDefaultProfilePicture = new this({
          userId,
          image: '/backend/image/defaultProfile.png', // Change this path if needed
          isDefault: true,
      });

      await newDefaultProfilePicture.save();

      return newDefaultProfilePicture;
  } catch (error) {
      console.error(error);
      throw new Error('Error finding or creating default banner');
  }
};

const ProfilePicture = mongoose.model('ProfilePicture', profilePictureSchema);

module.exports = ProfilePicture;
