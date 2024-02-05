const express = require("express");
const passport = require("passport");
const Project = require("../models/Project");

const router = express.Router();

//a route to create a new experience
router.post("/create", passport.authenticate("jwt", {session:false}), async (req, res) =>{

    // 1. Identify the user who is calling it
    const user = req.user;

    // 2. Create the experience object
    const {projectName, description, link} = req.body;

    if(!projectName){
        return res.status(402).json({err: "Invalid details"})
    }

    const projectObj = {projectName, description, link};

    const project = await Project.create(projectObj);

    // 3. Add experience to user
    user.projects.push(project._id);
    await user.save();

    // 4. Return a response
    return res.status(200).json(project);

});

// Route to get all projects associated with the authenticated user
router.get("/all", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        // 1. Identify the user who is calling it
        const user = req.user;

        // 2. Retrieve all projects associated with the user
        const projects = await Project.find({ _id: { $in: user.projects } });

        if(!projects){
            return res.status(402).json({err: "No projects found"})
        }

        // 3. Return the projects as a response
        return res.status(200).json(projects);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Internal Server Error" });
    }
});

// Route to Delete a project
router.delete("/delete/:projectId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        // 1. Identify the user who is calling it
        const user = req.user;

        // 2. Get the project ID from the request parameters
        const projectId = req.params.projectId;

        // 3. Check if the project exists
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ err: "Project not found" });
        }

        // 4. Check if the authenticated user owns the project
        if (!user.projects.includes(projectId)) {
            return res.status(403).json({ err: "Unauthorized to delete this project" });
        }

        // 5. Remove the project from the user's projects array
        user.projects = user.projects.filter(id => id.toString() !== projectId);

        // 6. Save the user with the updated projects array
        await user.save();

        // 7. Delete the project from the Project model
        await Project.findByIdAndDelete(projectId);

        // 8. Return a success response
        return res.status(200).json({ message: "Project deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Internal Server Error" });
    }
});

// Route to update a project
router.put("/update/:projectId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        // 1. Identify the user who is calling it
        const user = req.user;

        // 2. Get the project ID from the request parameters
        const projectId = req.params.projectId;

        // 3. Check if the project exists
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ err: "Project not found" });
        }

        // 4. Check if the authenticated user owns the project
        if (!user.projects.includes(projectId)) {
            return res.status(403).json({ err: "Unauthorized to update this project" });
        }

        // 5. Update the project with the new data if provided
        const { projectName, description, link } = req.body;

        // Only update attributes that are provided in the request
        if (projectName !== undefined) {
            project.projectName = projectName;
        }

        if (description !== undefined) {
            project.description = description;
        }

        if (link !== undefined) {
            project.link = link;
        }

        // 6. Save the updated project
        await project.save();

        // 7. Return a success response
        return res.status(200).json({ message: "Project updated successfully", project });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Internal Server Error" });
    }
});



module.exports = router;