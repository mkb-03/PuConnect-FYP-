// routes/profilePicture.js
const express = require('express');
const router = express.Router();
const ProfilePicture = require('../models/ProfilePicture');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads'); // Create an 'uploads' directory in your project

// Ensure the 'uploads' directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Route to get profile picture by user ID
router.get('/:userId', async (req, res) => {
  try {
    const profilePicture = await ProfilePicture.findOne({ userId: req.params.userId });

    if (!profilePicture) {
      return res.status(404).json({ message: 'Profile picture not found' });
    }

    res.json(profilePicture);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to update or create profile picture
router.post('/:userId', async (req, res) => {
  const { imageUrl } = req.body;

  try {
    let profilePicture = await ProfilePicture.findOne({ userId: req.params.userId });

    if (!profilePicture) {
      profilePicture = new ProfilePicture({
        userId: req.params.userId,
        imageUrl: saveImage(req.params.userId, imageUrl),
      });

      await profilePicture.save();
    } else {
      // Delete the existing file before updating the URL
      if (profilePicture.imageUrl) {
        deleteImage(profilePicture.userId);
      }

      profilePicture.imageUrl = saveImage(req.params.userId, imageUrl);
      await profilePicture.save();
    }

    res.json(profilePicture);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Function to save image to the server
const saveImage = (userId, base64Image) => {
  const imageData = base64Image.split(';base64,').pop();
  const imagePath = path.join(uploadDir, `${userId}_${Date.now()}.png`);

  fs.writeFileSync(imagePath, imageData, { encoding: 'base64' });

  return imagePath.replace(path.join(__dirname, '../'), ''); // Save the relative path in the database
};

// Function to delete an image from the server
const deleteImage = (userId) => {
  const profilePicture = ProfilePicture.findOne({ userId });
  if (profilePicture && profilePicture.imageUrl) {
    const imagePath = path.join(__dirname, '../', profilePicture.imageUrl);
    fs.unlinkSync(imagePath);
  }
};

module.exports = router;
