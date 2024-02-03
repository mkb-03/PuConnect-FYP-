const express = require("express");
const passport = require("passport");
const Experience = require("../models/Experience");

const router = express.Router();

//a route to create a new experience
router.post("/create", passport.authenticate("jwt", {session:false}), async (req, res) =>{

    // 1. Identify the user who is calling it
    const user = req.user;

    // 2. Create the experience object
    const {companyName, position, startDate, endDate, description} = req.body;

    if(!companyName || !position){
        return res.status(402).json({err: "Invalid details"})
    }

    const experienceObj = {companyName, position, startDate, endDate, description};

    const experience = await Experience.create(experienceObj);

    // 3. Add experience to user
    user.experiences.push(experience._id);
    await user.save();

    // 4. Return a response
    return res.status(200).json(experience);

});

// Route to get all experiences associated with the authenticated user
router.get("/all", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        // 1. Identify the user who is calling it
        const user = req.user;

        // 2. Retrieve all experiences associated with the user
        const experiences = await Experience.find({ _id: { $in: user.experiences } });

        if(!experiences){
            return res.status(402).json({err: "No experiences found"})
        }

        // 3. Return the projects as a response
        return res.status(200).json(experiences);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Internal Server Error" });
    }
});

// Route to Delete a experience
router.delete("/delete/:experienceId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        // 1. Identify the user who is calling it
        const user = req.user;

        // 2. Get the experienceId from the request parameters
        const experienceId = req.params.experienceId;

        // 3. Check if the project exists
        const experience = await Experience.findById(experienceId);

        if (!experience) {
            return res.status(404).json({ err: "Project not found" });
        }

        // 4. Check if the authenticated user owns the project
        if (!user.experiences.includes(experienceId)) {
            return res.status(403).json({ err: "Unauthorized to delete this experience" });
        }

        // 5. Remove the project from the user's experiences array
        user.experiences = user.experiences.filter(id => id.toString() !== experienceId);

        // 6. Save the user with the updated projects array
        await user.save();

        // 7. Delete the project from the Project model
        await Experience.findByIdAndDelete(experienceId);

        // 8. Return a success response
        return res.status(200).json({ message: "Experience deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Internal Server Error" });
    }
});

// Route to update a experience
router.put("/update/:experienceId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        // 1. Identify the user who is calling it
        const user = req.user;

        // 2. Get the project ID from the request parameters
        const experienceId = req.params.experienceId;

        // 3. Check if the project exists
        const experience = await Experience.findById(experienceId);

        if (!experience) {
            return res.status(404).json({ err: "Experience not found" });
        }

        // 4. Check if the authenticated user owns the project
        if (!user.experiences.includes(experienceId)) {
            return res.status(403).json({ err: "Unauthorized to update this experience" });
        }

        // 5. Update the project with the new data if provided
        const { companyName, position, startDate, endDate, description } = req.body;

        // Only update attributes that are provided in the request
        if (companyName !== undefined) {
            experience.companyName = companyName;
        }

        if (position !== undefined) {
            experience.position = position;
        }

        if (startDate !== undefined) {
            experience.startDate = startDate;
        }

        if (endDate !== undefined) {
            experience.endDate = endDate;
        }

        if (description !== undefined) {
            experience.description = description;
        }

        // 6. Save the updated project
        await experience.save();

        // 7. Return a success response
        return res.status(200).json({ message: "Experience updated successfully", experience });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Internal Server Error" });
    }
});



module.exports = router;