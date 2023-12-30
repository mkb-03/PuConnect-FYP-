const express = require('express');
const router = express.Router();
const BackgroundBanner = require('../models/BackgroundBanner');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads/bg-banners');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Use Multer middleware for handling file uploads
const multer = require('multer');
const upload = multer({ dest: uploadDir });

router.get('/:userId', async (req, res) => {
  try {
    const backgroundBanner = await BackgroundBanner.findOne({ userId: req.params.userId });

    if (!backgroundBanner) {
      return res.status(404).json({ message: 'Background banner not found' });
    }

    res.json(backgroundBanner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Use multer middleware to handle file upload in the post route
router.post('/:userId', upload.single('image'), async (req, res) => {
  const { userId } = req.params;

  try {
    const { filename } = req.file;
    const imageUrl = saveImage(userId, filename);

    let backgroundBanner = await BackgroundBanner.findOne({ userId });

    if (!backgroundBanner) {
      backgroundBanner = new BackgroundBanner({
        userId,
        imageUrl,
      });
    } else {
      deleteImage(userId, backgroundBanner.imageUrl);
      backgroundBanner.imageUrl = imageUrl;
    }

    await backgroundBanner.save();
    res.json(backgroundBanner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.put('/:userId', async (req, res) => {
  const { imageUrl } = req.body;

  try {
    let backgroundBanner = await BackgroundBanner.findOne({ userId: req.params.userId });

    if (!backgroundBanner) {
      return res.status(404).json({ message: 'Background banner not found' });
    }

    // Delete the existing file before updating the URL
    deleteImage(req.params.userId, backgroundBanner.imageUrl);
    backgroundBanner.imageUrl = saveImage(req.params.userId, imageUrl);
    await backgroundBanner.save();

    res.json(backgroundBanner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const backgroundBanner = await BackgroundBanner.findOneAndDelete({ userId: req.params.userId });

    if (!backgroundBanner) {
      return res.status(404).json({ message: 'Background banner not found' });
    }

    // Delete the existing file
    deleteImage(req.params.userId, backgroundBanner.imageUrl);

    res.json({ message: 'Background banner deleted successfully' });
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
