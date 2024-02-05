const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    projectName: 
    {
        type: String,
        required: true,
    },
    description: 
    {
        type: String,
        required: false,
    },
    link:
    {
        type: String,
        required: false,
    },
});

const Project = new mongoose.model("Project", ProjectSchema);

module.exports = Project;
