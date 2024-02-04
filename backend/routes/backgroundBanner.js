const express = require('express');
const router = express.Router();
const BackgroundBanner = require('../models/BackgroundBanner');
const passport = require("passport");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for adding a background banner
router.post('/add', passport.authenticate('jwt', { session: false }), upload.single('image'), async (req, res) => {
    try {
        // 1. Identify the user who is calling it
        const user = req.user;

        // 2. Check if an image file is provided
        if (!req.file) {
            return res.status(400).json({ error: 'Please provide an image file' });
        }

        // 3. Create the background banner object
        const imageBuffer = req.file.buffer.toString('base64');
        const backgroundBannerObj = {
            userId: user._id,
            bg_image: imageBuffer,
        };

        // 4. Save the backgroung banner directly to the database
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

        // 2. Find the latest banner for the user
        const latestBackgroundBanner = await BackgroundBanner.findOne({ userId: user._id }).sort({ createdAt: -1 });

        // 3. Check if a banner is found
        if (!latestBackgroundBanner) {
            return res.status(404).json({ error: 'Background Banner not found' });
        }

        // 4. Delete the banner from the database
        await BackgroundBanner.deleteOne({ _id: latestBackgroundBanner._id });

        // 5. Return a response
        return res.status(200).json({ message: 'Background Banner removed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for getting the latest banner
router.get('/get', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        // 1. Identify the user who is calling it
        const user = req.user;

        // 2. Find the latest banner for the user
        const latestBackgroundBanner = await BackgroundBanner.findOne({ userId: user._id }).sort({ createdAt: -1 });

        // 3. Check if a banner is found
        if (!latestBackgroundBanner) {
            const defaultBanner = await BackgroundBanner.findOrCreateDefault(user._id);
            return res.status(200).json(defaultBanner);
        }

        // 4. Return the banner data
        return res.status(200).json(latestBackgroundBanner);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for updating a user's banner
router.put('/update', passport.authenticate('jwt', { session: false }), upload.single('image'), async (req, res) => {
    try {
         // 1. Identify the user who is calling it
        const user = req.user;

        // 2. Check if an image file is provided
        if (!req.file) {
            return res.status(400).json({ error: 'Please provide an image file' });
        }

        // 3. Find the latest banner for the user
        const latestBackgroundBanner = await BackgroundBanner.findOne({ userId: user._id }).sort({ createdAt: -1 });

        // 4. Create the banner object
        const imageBuffer = req.file.buffer.toString('base64');
        const backgroundBannerObj = {
            userId: user._id,
            bg_image: imageBuffer,
            isDefault: false
        };

        // 5. If a banner exists, update it; otherwise, create a new one
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
