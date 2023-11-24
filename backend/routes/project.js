const express = require("express");
const passport = require("passport");
const Project = require("../models/Project");

const router = express.Router();

//a route to create a new experience
router.post("/create", passport.authenticate("jwt", {session:false}), async (req, res) =>{

    // 1. Identify the user who is calling it
    const user = req.user;

    // 2. Create the experience object
    const {projectName, description, links} = req.body;

    if(!projectName){
        return res.status(402).json({err: "Invalid details"})
    }

    const projectObj = {projectName, description, links};

    const project = await Project.create(projectObj);

    // 3. Add experience to user
    user.projects.push(project._id);
    await user.save();

    // 4. Return a response
    return res.status(200).json(project);

});



module.exports = router;