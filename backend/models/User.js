const mongoose = require("mongoose");


//Steps:
//1.Create schema
//2.Then convert schema into model

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    rollNo: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    experiences: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Experience",
        },
    ],
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },
    ],
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill",
        },
    ],

    sentRequest: [{
        friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        friendEmail: { type: String, default: '' }  
    }],

    request: [{
        friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        friendEmail: { type: String, default: '' }
    }],

    friendsList: [{
        friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        friendEmail: { type: String, default: '' }
    }],
    
    totalRequest: { type: Number, default: 0 }
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
