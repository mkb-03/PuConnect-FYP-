const express = require('express');
const router = express.Router();
const BackgroundBanner = require('../models/BackgroundBanner');
const passport = require("passport");
const multer = require('multer'); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//Route for adding a background banner
router.post('/add', passport.authenticate('jwt', { session: false }), upload.single('image'), async (req, res) => {
  try {
      // 1. Identify the user who is calling it
      const user = req.user;

      // 2. Check if an image file is provided
      if (!req.file) {
          return res.status(400).json({ error: 'Please provide an image file' });
      }

      // 3. Create the profile picture object
      const imageBuffer = req.file.buffer.toString('base64');
      const backgroundBannerObj = {
          userId: user._id,
          bg_image: imageBuffer,
      };

      // 4. Save the profile picture directly to the database
      const backgroundBanner = await BackgroundBanner.create(backgroundBannerObj);

      // 5. Return a response
      return res.status(200).json(backgroundBanner);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for removing a background banner
router.delete('/remove', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
      // 1. Identify the user who is calling it
      const user = req.user;

      // 2. Find the latest profile picture for the user
      const latestBackgroundBanner = await BackgroundBanner.findOne({ userId: user._id }).sort({ createdAt: -1 });

      // 3. Check if a profile picture is found
      if (!latestBackgroundBanner) {
          return res.status(404).json({ error: 'Background Banner not found' });
      }

      // 4. Delete the profile picture from the database
      await BackgroundBanner.deleteOne({ _id: latestBackgroundBanner._id });

      // 5. Return a response
      return res.status(200).json({ message: 'Background Banner removed successfully' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for getting the latest background banner
router.get('/get', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
      // 1. Identify the user who is calling it
      const user = req.user;

      // 2. Find the latest background banner for the user
      const latestBackgroundBanner = await BackgroundBanner.findOne({ userId: user._id }).sort({ createdAt: -1 });

      // 3. Check if a background banner is found
      if (!latestBackgroundBanner) {
          return res.status(404).json({ error: 'background banner not found' });
      }

      // 4. Return the profile picture data
      return res.status(200).json(latestBackgroundBanner);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for updating a user's background banner
router.put('/update', passport.authenticate('jwt', { session: false }), upload.single('image'), async (req, res) => {
  try {
      // 1. Identify the user who is calling it
      const user = req.user;

      // 2. Check if an image file is provided
      if (!req.file) {
          return res.status(400).json({ error: 'Please provide an image file' });
      }

      // 3. Find the latest background banner for the user
      const latestBackgroundBanner = await BackgroundBanner.findOne({ userId: user._id }).sort({ createdAt: -1 });

      // 4. Create the background banner object
      const imageBuffer = req.file.buffer.toString('base64');
      const backgroundBannerObj = {
          userId: user._id,
          bg_image: imageBuffer,
      };

      // 5. If a background banner exists, update it; otherwise, create a new one
      if (latestBackgroundBanner) {
          await BackgroundBanner.findByIdAndUpdate(latestBackgroundBanner._id, backgroundBannerObj);
      } else {
          await BackgroundBanner.create(backgroundBannerObj);
      }

      // 6. Return a response
      return res.status(200).json({ message: 'Profile picture updated successfully' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;