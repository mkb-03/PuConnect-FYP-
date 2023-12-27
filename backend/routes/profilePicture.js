const express = require('express');
const router = express.Router();
const ProfilePicture = require('../models/ProfilePicture');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

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

router.post('/:userId', async (req, res) => {
  const { imageUrl } = req.body;

  try {
    let profilePicture = await ProfilePicture.findOne({ userId: req.params.userId });

    if (!profilePicture) {
      profilePicture = new ProfilePicture({
        userId: req.params.userId,
        imageUrl: saveImage(req.params.userId, imageUrl),
      });
    } else {
      // Delete the existing file before updating the URL
      deleteImage(req.params.userId, profilePicture.imageUrl);
      profilePicture.imageUrl = saveImage(req.params.userId, imageUrl);
    }

    await profilePicture.save();
    res.json(profilePicture);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/:userId', async (req, res) => {
  const { imageUrl } = req.body;

  try {
    let profilePicture = await ProfilePicture.findOne({ userId: req.params.userId });

    if (!profilePicture) {
      return res.status(404).json({ message: 'Profile picture not found' });
    }

    // Delete the existing file before updating the URL
    deleteImage(req.params.userId, profilePicture.imageUrl);
    profilePicture.imageUrl = saveImage(req.params.userId, imageUrl);
    await profilePicture.save();

    res.json(profilePicture);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const profilePicture = await ProfilePicture.findOneAndDelete({ userId: req.params.userId });

    if (!profilePicture) {
      return res.status(404).json({ message: 'Profile picture not found' });
    }

    // Delete the existing file
    deleteImage(req.params.userId, profilePicture.imageUrl);

    res.json({ message: 'Profile picture deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const saveImage = (userId, base64Image) => {
  const imageData = base64Image.split(';base64,').pop();
  const imagePath = path.join(uploadDir, `${userId}_${Date.now()}.png`);

  fs.writeFileSync(imagePath, imageData, { encoding: 'base64' });

  return imagePath.replace(path.join(__dirname, '../'), '');
};

const deleteImage = (userId, imagePath) => {
  if (imagePath) {
    const fullPath = path.join(__dirname, '../', imagePath);
    fs.unlinkSync(fullPath);
  }
};

module.exports = router;
