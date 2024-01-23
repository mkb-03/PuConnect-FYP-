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
});

const ProfilePicture = mongoose.model('ProfilePicture', profilePictureSchema);

module.exports = ProfilePicture;
