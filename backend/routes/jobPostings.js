const express = require("express");
const router = express.Router();
const JobPosting = require("../models/JobPosting");

// Create a new job posting
router.post("/", async (req, res) => {
    try {
        const jobPosting = new JobPosting({
            postedBy: req.body.postedBy, // Assuming postedBy is the user's ID
            companyName: req.body.companyName,
            email: req.body.email,
            jobTitle: req.body.jobTitle,
            jobFunction: req.body.jobFunction,
            jobLocation: req.body.jobLocation,
            numberofApplicants: req.body.numberofApplicants || 0,
            seniorityLevel: req.body.seniorityLevel,
            description: req.body.description,
            postingDate: req.body.postingDate || Date.now(),
            employmentType: req.body.employmentType,
            industryType: req.body.industryType,
            experience: req.body.experience,
        });

        await jobPosting.save();
        res.status(201).send(jobPosting);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all job postings
router.get("/", async (req, res) => {
    try {
        const jobPostings = await JobPosting.find();
        res.send(jobPostings);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single job posting by ID
router.get("/:id", async (req, res) => {
    try {
        const jobPosting = await JobPosting.findById(req.params.id);
        if (!jobPosting) {
            return res.status(404).send();
        }
        res.send(jobPosting);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a job posting by ID
router.patch("/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        "companyName",
        "email",
        "jobTitle",
        "jobFunction",
        "jobLocation",
        "numberofApplicants",
        "seniorityLevel",
        "description",
        "postingDate",
        "employmentType",
        "industryType",
        "experience",
    ];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" });
    }

    try {
        const jobPosting = await JobPosting.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!jobPosting) {
            return res.status(404).send();
        }

        res.send(jobPosting);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a job posting by ID
router.delete("/:id", async (req, res) => {
    try {
        const jobPosting = await JobPosting.findByIdAndDelete(req.params.id);

        if (!jobPosting) {
            return res.status(404).send();
        }

        res.send(jobPosting);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
