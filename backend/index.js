//Import required packages and modules

//import express package
const express = require("express");

// Import mongoose for MongoDB
const mongoose = require("mongoose"); 

const path = require("path");
const pino = require("pino")();
const fetch = require('isomorphic-fetch');

const expressPino = require("express-pino-logger");

// Import passport for authentication middleware
const passport = require("passport");

// ExtractJwt module from passport-jwt for extracting JWT from the request
const ExtractJwt = require("passport-jwt").ExtractJwt; 

// Strategy module from passport-jwt for defining JWT authentication strategy
const jwtStrategy = require("passport-jwt").Strategy;


const cors = require("cors");

// Load environment variables
require("dotenv").config(); 

// Import authentication routes
const authRoutes = require("./routes/authentication");
const experienceRoutes = require("./routes/experience");
const skillRoutes = require("./routes/skill");
const projectRoutes = require("./routes/project");
const postRoutes = require("./routes/post");
const connectionRoutes = require("./routes/connection")
const profilePicRoutes = require("./routes/profilePicture")
const jobPostingRoutes = require("./routes/jobPostings")
const backgroundBannerRoutes = require("./routes/backgroundBanner")

// Import User model
const User = require("./models/User");
const BackgroundBanner = require("./models/BackgroundBanner");

// Create an instance of Express
const app = express(); 

// Enable JSON parsing for incoming requests
app.use(express.json());


const corsOptions = {
  origin: 'http://localhost:3001', // Replace with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));


mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/PuConnect', {
    useNewUrlParser: true,
  })
  .then(() => {
    pino.info("Connected to MongoDB");
  })
  .catch((err) => {
    pino.error("Error occurred while connecting to MongoDB");
    pino.error(err);
  });

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "herecomesthesecretkey",
};

passport.use(
  new jwtStrategy(options, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ _id: jwt_payload.identifier });

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  })
);

const logger = expressPino({ logger: pino });
app.use(logger);

app.use("/auth", authRoutes);
app.use("/experience", experienceRoutes);
app.use("/skill", skillRoutes);
app.use("/project", projectRoutes);
app.use("/post", postRoutes)
app.use("/connection", connectionRoutes);
app.use("/profile-picture", profilePicRoutes)
app.use("/job-postings", jobPostingRoutes)
app.use("/bg-banner", backgroundBannerRoutes)

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});


// Additional functions for updating image URLs can be added here if needed
async function updateImageUrls() {
  try {
    // Logic for updating image URLs
    // For example, you can iterate over users and update their image URLs
    const users = await User.find();
    
    for (const user of users) {
      // Fetch the banner image URL separately
      const bannerImageResponse = await fetch(`http://localhost:3000/bg-banner/${user._id}`);
      const fetchedBannerImage = await bannerImageResponse.json();

      // Update the banner image state
      await BackgroundBanner.findOneAndUpdate(
        { userId: user._id },
        { imageUrl: fetchedBannerImage.imageUrl },
        { new: true }
      );

      console.log(`Updated image URL for user with ID: ${user._id}`);
    }

    console.log('Image URLs updated successfully');
  } catch (error) {
    console.error('Error updating image URLs', error);
  }
}

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  pino.info(`Server is running on port ${port}`);

  // Call the function to update image URLs when the server starts
  await updateImageUrls();
});

