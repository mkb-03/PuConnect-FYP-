//Import required packages and modules

//import express package
const express = require("express");

// Import passport for authentication middleware
const passport = require("passport");

// ExtractJwt module from passport-jwt for extracting JWT from the request
const ExtractJwt = require("passport-jwt").ExtractJwt; 

// Strategy module from passport-jwt for defining JWT authentication strategy
const jwtStrategy = require("passport-jwt").Strategy;

// Import mongoose for MongoDB
const mongoose = require("mongoose"); 

// Load environment variables
require("dotenv").config(); 

// Import authentication routes
const authRoutes = require("./routes/authentication")

// Import User model
const User = require("./models/User");

// MongoDB connection setup
const url = 'mongodb://localhost:27017/PuConnect'; 
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then((x)=>{
    console.log("Connected to mongoDB");
}).catch((err)=>{
    console.log("Error occured while connecting to mongo!");
    console.log(err);
});

// Create an instance of Express
const app = express(); 

// Enable JSON parsing for incoming requests
app.use(express.json());

//passport-jwt setup
//jwt_payload : {identifier: userId}

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : "herecomesthesecretkey"
}

// Configure passport to use jwt strategy
passport.use(new jwtStrategy(options, function (jwt_payload, done) {
    // Find the user in the database based on the identifier in jwt_payload
    User.findOne({ _id: jwt_payload.identifier }, function (err, user) {
        if (err) {
            done(err, false);
        }
        if(user){
            // If user found, authentication is successful
            done(null, user);
        }
        else{
            // If user not found, authentication fails
            done(null, false);
        }
    })
}));

// Define a route for the root endpoint
app.get("/", (req, res) => {
    res.send("I am working");
});

// Define a route for a "/hello" endpoint
app.get("/hello", (req, res) => {
    res.send("Hello World");
});

// Use authentication routes with the "/auth" prefix
app.use("/auth", authRoutes);

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port no 3000");
});
