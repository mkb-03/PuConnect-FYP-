const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
    name:{
        type:String,
        required: false,
        unique: false,
    },
    description:{
        type:String,
        required: false,
    },
    links:[
        {
        type: String,
        },
    ],
});

const Skill = new mongoose.model("Skill", SkillSchema);

module.exports = Skill;
