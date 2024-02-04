const express = require("express");
const passport = require("passport");
const Skill = require("../models/Skill");

const router = express.Router();

router.post("/create", passport.authenticate("jwt", {session:false}), async (req, res) =>{

    // 1. Identify the user who is calling it
    const user = req.user;

    // 2. Create the skill object
    const {name, description, links} = req.body;

    if(!name){
        return res.status(402).json({err: "Invalid details"})
    }

    const skillObj = {name, description, links};

    const skill = await Skill.create(skillObj);

    // 3. Add experience to user
    user.skills.push(skill._id);
    await user.save();

    // 4. Return a response
    return res.status(200).json(skill);

});

// Route to delete a skill
router.delete("/delete/:skillId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        // 1. Identify the user who is calling it
        const user = req.user;

        // 2. Get the skill ID from the request parameters
        const skillId = req.params.skillId;

        // 3. Check if the skill exists
        const skill = await Skill.findById(skillId);

        if (!skill) {
            return res.status(404).json({ err: "Skill not found" });
        }

        // 4. Check if the authenticated user has this skill
        if (!user.skills.includes(skillId)) {
            return res.status(403).json({ err: "Unauthorized to delete this skill" });
        }

        // 5. Remove the skill from the user's skills array
        user.skills = user.skills.filter(id => id.toString() !== skillId);

        // 6. Save the user with the updated skills array
        await user.save();

        // 7. Delete the skill from the Skill model
        await Skill.findByIdAndDelete(skillId);

        // 8. Return a success response
        return res.status(200).json({ message: "Skill deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Internal Server Error" });
    }
});

// Route to update a skill
router.put("/update/:skillId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        // 1. Identify the user who is calling it
        const user = req.user;

        // 2. Get the skill ID from the request parameters
        const skillId = req.params.skillId;

        // 3. Check if the skill exists
        const skill = await Skill.findById(skillId);

        if (!skill) {
            return res.status(404).json({ err: "Skill not found" });
        }

        // 4. Check if the authenticated user owns the skill
        if (!user.skills.includes(skillId)) {
            return res.status(403).json({ err: "Unauthorized to update this skill" });
        }

        // 5. Update the skill with the new data if provided
        const {name, description, links } = req.body;

        // Only update attributes that are provided in the request
        if (name !== undefined) {
            skill.name = name;
        }

        if (description !== undefined) {
            skill.description = description;
        }

        if (links !== undefined) {
            skill.links = links;
        }

        // 6. Save the updated skill
        await skill.save();

        // 7. Return a success response
        return res.status(200).json({ message: "Skill updated successfully", skill });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Internal Server Error" });
    }
});

// Route to get all skills associated with the authenticated user
router.get("/all", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        // 1. Identify the user who is calling it
        const user = req.user;

        // 2. Retrieve all skills associated with the user
        const skills = await Skill.find({ _id: { $in: user.skills } });

        if(!skills){
            return res.status(402).json({err: "No skills found"})
        }

        // 3. Return the skills as a response
        return res.status(200).json(skills);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Internal Server Error" });
    }
});


module.exports = router;