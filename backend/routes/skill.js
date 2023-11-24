const express = require("express");
const passport = require("passport");
const Skill = require("../models/Skill");

const router = express.Router();

//a route to create a new experience
router.post("/create", passport.authenticate("jwt", {session:false}), async (req, res) =>{

    // 1. Identify the user who is calling it
    const user = req.user;

    // 2. Create the experience object
    const {skillName} = req.body;

    if(!skillName){
        return res.status(402).json({err: "Invalid details"})
    }

    const skillObj = {skillName};

    const skill = await Skill.create(skillObj);

    // 3. Add experience to user
    user.skills.push(skill._id);
    await user.save();

    // 4. Return a response
    return res.status(200).json(skill);

});


module.exports = router;