const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        unique: false,
    },
    description: {
        type: String,
        required: false,
    },
    link:
    {
        type: String,
        required: false,
    },
});

const Skill = new mongoose.model("Skill", SkillSchema);

module.exports = Skill;
