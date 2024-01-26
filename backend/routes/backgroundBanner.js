const express = require('express');
const router = express.Router();
const BackgroundBanner = require('../models/BackgroundBanner');
const passport = require("passport");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', passport.authenticate('jwt', { session: false }), upload.single('image'), async (req, res) => {
    try {
        const user = req.user;

        if (!req.file) {
            return res.status(400).json({ error: 'Please provide an image file' });
        }

        const imageBuffer = req.file.buffer.toString('base64');
        const backgroundBannerObj = {
            userId: user._id,
            bg_image: imageBuffer,
        };

        const backgroundBanner = await BackgroundBanner.create(backgroundBannerObj);

        return res.status(200).json(backgroundBanner);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/remove', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = req.user;
        const latestBackgroundBanner = await BackgroundBanner.findOne({ userId: user._id }).sort({ createdAt: -1 });

        if (!latestBackgroundBanner) {
            return res.status(404).json({ error: 'Background Banner not found' });
        }

        await BackgroundBanner.deleteOne({ _id: latestBackgroundBanner._id });

        return res.status(200).json({ message: 'Background Banner removed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/get', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = req.user;
        const latestBackgroundBanner = await BackgroundBanner.findOne({ userId: user._id }).sort({ createdAt: -1 });

        if (!latestBackgroundBanner) {
            return res.status(404).json({ error: 'Background Banner not found' });
        }

        return res.status(200).json(latestBackgroundBanner);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/update', passport.authenticate('jwt', { session: false }), upload.single('image'), async (req, res) => {
    try {
        const user = req.user;

        if (!req.file) {
            return res.status(400).json({ error: 'Please provide an image file' });
        }

        const latestBackgroundBanner = await BackgroundBanner.findOne({ userId: user._id }).sort({ createdAt: -1 });

        const imageBuffer = req.file.buffer.toString('base64');
        const backgroundBannerObj = {
            userId: user._id,
            bg_image: imageBuffer,
        };

        if (latestBackgroundBanner) {
            await BackgroundBanner.findByIdAndUpdate(latestBackgroundBanner._id, backgroundBannerObj);
        } else {
            await BackgroundBanner.create(backgroundBannerObj);
        }

        return res.status(200).json({ message: 'Profile picture updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
