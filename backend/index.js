const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const pino = require("pino")();
const expressPino = require("express-pino-logger");
const { ExtractJwt, Strategy: jwtStrategy } = require("passport-jwt");
const passport = require("passport");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authentication");
const experienceRoutes = require("./routes/experience");
const skillRoutes = require("./routes/skill");
const projectRoutes = require("./routes/project");
const postRoutes = require("./routes/post");
const connectionRoutes = require("./routes/connection")
const User = require("./models/User");

const app = express();

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

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  pino.info(`Server is running on port ${port}`);
});
