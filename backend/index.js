//Import required packages and modules

//import express package
const express = require("express");

// Import mongoose for MongoDB
const mongoose = require("mongoose"); 

const path = require("path");
const pino = require("pino")();
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
const authRoutes = require("./routes/authentication")

const profilePicRoutes = require("./routes/profilePicture")

// Import User model
const User = require("./models/User");

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

// Use profile picture routes with the /profile-picture prefix
app.use("/profile-picture", profilePicRoutes)

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port no 3000");
});






















