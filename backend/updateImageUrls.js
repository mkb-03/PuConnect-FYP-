const mongoose = require('mongoose');
const BackgroundBanner = require('./models/BackgroundBanner');

const mongoURI = 'mongodb://localhost:27017';
const dbName = 'YOUR_DATABASE_NAME';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, dbName });

const updateImageUrls = async () => {
  try {
    const backgroundBanners = await BackgroundBanner.find();

    for (const banner of backgroundBanners) {
      const updatedUrl = banner.imageUrl.replace(/\\/g, '/');
      banner.imageUrl = updatedUrl;
      await banner.save();
    }

    console.log('Image URLs updated successfully.');
  } catch (error) {
    console.error('Error updating image URLs:', error);
  } finally {
    mongoose.disconnect();
  }
};

updateImageUrls();
