const express = require('express');
const router = express.Router();
const ProfilePicture = require('../models/ProfilePicture');
const passport = require("passport");
const multer = require('multer'); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for adding a profile picture
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
      const profilePictureObj = {
          userId: user._id,
          image: imageBuffer,
      };

      // 4. Save the profile picture directly to the database
      const profilePicture = await ProfilePicture.create(profilePictureObj);

      // 5. Return a response
      return res.status(200).json(profilePicture);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for removing a profile picture
router.delete('/remove', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
      // 1. Identify the user who is calling it
      const user = req.user;

      // 2. Find the latest profile picture for the user
      const latestProfilePicture = await ProfilePicture.findOne({ userId: user._id }).sort({ createdAt: -1 });

      // 3. Check if a profile picture is found
      if (!latestProfilePicture) {
          return res.status(404).json({ error: 'Profile picture not found' });
      }

      // 4. Delete the profile picture from the database
      await ProfilePicture.deleteOne({ _id: latestProfilePicture._id });

      // 5. Return a response
      return res.status(200).json({ message: 'Profile picture removed successfully' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for getting the latest profile picture
router.get('/get', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
      // 1. Identify the user who is calling it
      const user = req.user;

      // 2. Find the latest profile picture for the user
      const latestProfilePicture = await ProfilePicture.findOne({ userId: user._id }).sort({ createdAt: -1 });

      // 3. Check if a profile picture is found
      if (!latestProfilePicture) {
          return res.status(404).json({ error: 'Profile picture not found' });
      }

      // 4. Return the profile picture data
      return res.status(200).json(latestProfilePicture);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for updating a user's profile picture
router.put('/update', passport.authenticate('jwt', { session: false }), upload.single('image'), async (req, res) => {
  try {
      // 1. Identify the user who is calling it
      const user = req.user;

      // 2. Check if an image file is provided
      if (!req.file) {
          return res.status(400).json({ error: 'Please provide an image file' });
      }

      // 3. Find the latest profile picture for the user
      const latestProfilePicture = await ProfilePicture.findOne({ userId: user._id }).sort({ createdAt: -1 });

      // 4. Create the profile picture object
      const imageBuffer = req.file.buffer.toString('base64');
      const profilePictureObj = {
          userId: user._id,
          image: imageBuffer,
      };

      // 5. If a profile picture exists, update it; otherwise, create a new one
      if (latestProfilePicture) {
          await ProfilePicture.findByIdAndUpdate(latestProfilePicture._id, profilePictureObj);
      } else {
          await ProfilePicture.create(profilePictureObj);
      }

      // 6. Return a response
      return res.status(200).json({ message: 'Profile picture updated successfully' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
